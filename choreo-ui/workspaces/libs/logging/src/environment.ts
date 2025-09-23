// import process from 'process';
import { LogLevel } from './logger';

// Extend ImportMeta to include env property
declare global {
  interface ImportMeta {
    env: {
      MODE: string;
    };
  }
}

// the app environment
export type Environment = 'development' | 'production';

const env: Environment = import.meta.env.MODE as Environment;

export const APP_ENV: Environment =
  env === 'production' ? 'production' : 'development';

export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : 'log';
