import { LOG_LEVEL } from './environment';

// signature of loggin function
export interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

//basic logger interface
export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

//log levels
export type LogLevel = 'log' | 'warn' | 'error';

const NO_OP: LogFn = () => {};

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = console.error.bind(console, '\n', new Error().stack);

    if (level === 'error') {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console, '\n', new Error().stack);

    if (level === 'warn') {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console, '\n', new Error().stack);
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL });
