import { Module } from '@nestjs/common';
import { InMemoryDb } from './db.service';

@Module({
  providers: [InMemoryDb],
})
export class DbModule {}
