import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email that will be used to login' })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description:
      'The password must contain at least one uppercase letter, one special character and one number and be made up of at least 8 characters.',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ description: 'First name' })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  public readonly lastName: string;
}
