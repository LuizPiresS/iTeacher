import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
