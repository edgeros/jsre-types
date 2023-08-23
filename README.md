EdgerOS JSRE Type Definitions
---

This is TypeScript declarations of EdgerOS JavaScript Runtime environment.

Unlike Node.js, EdgerOS JSRE is built on top of SylixOS® kernel and light weight
JavaScript engine that is more memory efficient. Thanks to the self-owned OS
kernel, EdgerOS JSRE support both synchronous and asynchrous programming
mode and many other powerful utilities that may ease your development.

For more information please check [EdgerOS API](https://www.edgeros.com/edgeros/api/).

## Usage

- In the pure `js` projects, you need to create the `jsconfig.json` file in the root directory and configure it as follows:

```json
{
  "compilerOptions": {
      "module": "commonjs",
      "target": "es6",
      "typeRoots": [
          "node_modules/@edgeros"
      ],
      "types": [
          "jsre-types"
      ]
  }
}
```

- In the `ts` project, configure `typeRoots` as follows:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@edgeros"
    ],
  }
}

```

## About version

This package's *major* and *minor* version number will keep in sync with EdgerOS
JSRE, while the *patch* number is subject to change. For example, when current
EdgerOS JSRE release is 1.14.0, this package version could be 1.14.x.

## Contribute

It's appreciated if you can contribute to this project by reporting bugs, and PR
is also welcomed.