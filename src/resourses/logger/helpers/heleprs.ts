import { LogLevel } from '@nestjs/common';
import * as process from 'process';

const LOG_LEVELS_ARR: Array<LogLevel> = [
  'error',
  'warn',
  'log',
  'verbose',
  'debug',
];
export const getLogLevels = (logLevel: number): LogLevel[] => {
  const level = +process.env.LOG_LEVEL;
  return [LOG_LEVELS_ARR[level]];
};
