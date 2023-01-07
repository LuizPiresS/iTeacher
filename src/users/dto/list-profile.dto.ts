import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class listProfileDto {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
