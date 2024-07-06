import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDTO {
  @ApiProperty({ example: 'Random Street Name' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 'Random Neighborhood Name' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;
}

export class ProfileInputDTO {
  @ApiProperty({ example: 'a514b0ec-0cd5-4709-a059-e67c30f907e5' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Random Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '(99)999999999' })
  @IsString()
  @IsNotEmpty()
  cellPhone: string;

  @ApiProperty({ type: AddressDTO })
  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;
}
