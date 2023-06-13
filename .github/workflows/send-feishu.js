#!/usr/bin/env node

const https = require('https')
const crypto = require("crypto")
const timestamp = ~~((new Date().getTime()) / 1000)

const secretKey = process.env.FEISHU_SIGN
const webhookUrl = process.env.FEISHU_WEBHOOK

const hmac = crypto.createHmac('sha256', timestamp + '\n' + secretKey)
const up = hmac.update("")

if (!process.env.GITHUB) {
  return console.error('没有获取到 github 构建数据。')
}

if (JSON.parse(process.env.GITHUB).event_name !== 'release') {
  return console.warn('此消息通知仅支持 release 事件。')
}

const { repository, actor, event } = JSON.parse(process.env.GITHUB)

// 卡片消息结构
const card = {
  "config": {
    "wide_screen_mode": true
  },
  "elements": [
    {
      "tag": "markdown",
      "content": "<at id=all></at>"
    },
    {
      "tag": "hr"
    },
    {
      "tag": "div",
      "fields": [
        {
          "is_short": true,
          "text": {
            "tag": "lark_md",
            "content": `**版本：**\n${event.release.tag_name}`
          }
        }
      ]
    },
    {
      "tag": "div",
      "fields": [
        {
          "is_short": true,
          "text": {
            "tag": "lark_md",
            "content": `**提交人：**\n${actor}`
          }
        },
        {
          "is_short": true,
          "text": {
            "tag": "lark_md",
            "content": `**提交时间：**\n${event.release.published_at}`
          }
        }
      ]
    },
    {
      "tag": "div",
      "fields": [
        {
          "is_short": true,
          "text": {
            "tag": "lark_md",
            "content": `**描述信息：**\n${event.release.body}`
          }
        }
      ]
    },
    {
      "tag": "hr"
    },
    {
      "tag": "action",
      "actions": [
        {
          "tag": "button",
          "text": {
            "tag": "plain_text",
            "content": "查看详情"
          },
          "type": "primary",
          "url": event.release.html_url
        }
      ]
    }
  ],
  "header": {
    "template": "blue",
    "title": {
      "content": `${repository} 新版本发布`,
      "tag": "plain_text"
    }
  }
}

const data = JSON.stringify({
  "timestamp": timestamp,
  "sign": up.digest('base64'),
  "msg_type": "interactive",
  "card": card
})

const options = {
  method: 'POST'
}

const req = https.request(webhookUrl, options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
