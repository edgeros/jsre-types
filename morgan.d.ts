declare module 'edgeros:morgan' {
  import morgan = require('morgan');
  export = morgan;
}

declare module "morgan" {

  namespace morgan {

    function morgan(format?: string | Function, options?: MorganOptions)
    namespace morgan {
      function token(name: string, fn: (req: object, res: object) => void)
    }

    interface MorganOptions {
      immediate?: object; // {Boolean} Write log line on request instead of response. default: false
      skip?: object; // {Function} Function to determine if logging is skipped,
      stream?: object; // {Object} Output stream for writing log lines, default: stdout stream.
    }
  }

  export = morgan;
}
