import { Module } from '@nestjs/common';
import { HashingService } from './domain/services/hashing.service';

@Module({
  providers: [HashingService],
})
export class HashingModule {}
