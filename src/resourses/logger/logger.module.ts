import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { CustomLoggerService } from './logger.service';

@Module({
  providers: [LoggerMiddleware, CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
