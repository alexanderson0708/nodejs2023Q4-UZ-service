import { mkdir, stat } from 'fs/promises';
import { createWriteStream } from 'node:fs';
import { EOL } from 'node:os';
import path from 'path';
import { InternalServerErrorException } from '@nestjs/common';
import * as process from 'process';

export class WriteLogs {
  pathToDirectory = '/app/my_logs';
  initNameLogFile: string;
  initNameErrFile: string;

  constructor() {
    this.createDirectory();
  }

  async write(message, type) {
    if (type === 'log') {
      await this.writeStreamMain(message);
    } else {
      await this.writeStreamError(message);
    }
  }

  async createDirectory() {
    try {
      await mkdir(this.pathToDirectory);
      console.log(`Directory is created at ${this.pathToDirectory}`);
    } catch (e) {
      console.log('Directory already exist');
    }
  }

  async writeStreamMain(message) {
    if (this.initNameLogFile) this.initNameLogFile = new Date().toJSON();
    const pathToFile = `${this.pathToDirectory}${path.sep}${this.initNameLogFile}.log`;
    await this.checkFileSize(pathToFile, message, false);
    const ws = createWriteStream(pathToFile, { flags: 'a' });
    ws.write(message + EOL);
  }

  async writeStreamError(message) {
    if (this.initNameErrFile) this.initNameErrFile = new Date().toJSON();
    const pathToFile = `${this.pathToDirectory}ERROR${path.sep}${this.initNameErrFile}.log`;
    await this.checkFileSize(pathToFile, message, true);
    const ws = createWriteStream(pathToFile, { flags: 'a' });
    ws.write(message + EOL);
  }

  async checkFileSize(pathToFile, message, errorStream) {
    let fileSize;
    try {
      fileSize = (await stat(pathToFile)).size;
    } catch (e) {
      if (e.code !== 'ENOENT') throw new InternalServerErrorException();
      fileSize = 0;
    }
    const msgSize = Buffer.byteLength(message, 'utf-8');
    if (fileSize + msgSize > process.env.LOG_FILE_SIZE) {
      if (errorStream) {
        this.initNameErrFile = new Date().toJSON();
      } else this.initNameLogFile = new Date().toJSON();
    }
  }
}
