import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as process from 'process';
import { join } from 'path';
import { appendFile, mkdir, readdir, stat, open } from 'fs/promises';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private readonly logLevel: number = +process.env.LOG_LEVEL;
  private readonly fileSize: number = +process.env.LOG_FILE_SIZE;
  constructor() {
    super();
  }

  async log(message, context?) {
    super.log(message, context);
    await this.writeLogToFile(message, 'log');
  }

  async error(message, stack?, context?) {
    if (this.logLevel >= 1) {
      super.error(message, stack, context);
      if (message instanceof Error) {
        const { message: errorMsg, name } = message;
        const content = `${name} - ${errorMsg} ${context}`;
        await this.writeLogToFile(content, 'error');
      } else {
        const content = `${stack} ${message}`;
        await this.writeLogToFile(content, 'error');
      }
    }
  }

  async warn(message, context?) {
    if (this.logLevel >= 2) {
      super.warn(message, context);
      await this.writeLogToFile(message, 'warn');
    }
  }

  async debug(message, context?) {
    if (this.logLevel >= 3) {
      super.warn(message, context);
      await this.writeLogToFile(message, 'debug');
    }
  }

  async verbose(message, context?) {
    if (this.logLevel >= 4) {
      super.warn(message, context);
      await this.writeLogToFile(message, 'verbose');
    }
  }

  private async writeLogToFile(message, type) {
    let filename;
    const pathToFile = join(__dirname, 'files');
    await mkdir(pathToFile, { recursive: true });

    const files = await readdir(pathToFile);
    const pathToDirectory = join(pathToFile, `${type}s`);
    if (!files.includes(`${type}s`)) await mkdir(pathToDirectory);

    const saveToDirectory = await readdir(pathToDirectory);
    let num = saveToDirectory.length - 1;
    if (num === -1) {
      filename = `${type}.txt`;
      await open(join(pathToDirectory, filename), 'w');
    } else {
      filename = num === 0 ? `${type}.txt` : `${type}${num}.txt`;
    }

    const date = new Date().toLocaleString();
    const dataSize = Buffer.byteLength(date, 'utf-8');
    const { size } = await stat(join(pathToDirectory, filename));
    const msgSize = Buffer.byteLength(message, 'utf-8');
    const totalSize = dataSize + size + msgSize;
    if (totalSize > this.fileSize) {
      num += 1;
      filename = `${type}${num}.txt`;
      await open(join(pathToDirectory, filename), 'w');
    }

    await appendFile(join(pathToDirectory, filename), `${date}-${message}\n`);
  }
}
