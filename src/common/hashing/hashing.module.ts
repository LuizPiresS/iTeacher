import { Module } from '@nestjs/common';
import { HashingService } from './domain/services/hashing.service';

@Module({
  providers: [{ provide: 'IHashService', useClass: HashingService }],
  exports: ['IHashService'],
})
export class HashingModule {}
