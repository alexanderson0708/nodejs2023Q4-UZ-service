import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLoggerService) {}
  use(req, res, next: () => void) {
    res.on('finish', () => {
      const { method, url, body, query } = req;
      const { statusCode, statusMessage } = res;

      const message = `${method} ${url} query: ${JSON.stringify(
        query,
      )} body:${JSON.stringify(body)} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) return this.logger.error(message);
      if (statusCode >= 400) return this.logger.warn(message, url);

      return this.logger.log(message, url);
    });

    next();
  }
}
