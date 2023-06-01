import { Module } from '@nestjs/common';
import { InMemoryDb } from './db.service.db';

@Module({
  providers: [InMemoryDb],
  exports: [InMemoryDb],
})
export class DbModule {}
