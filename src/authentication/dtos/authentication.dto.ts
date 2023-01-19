import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {
  @ApiProperty({
    description: 'User e-mail that will be used to login',
    required: true,
    example: 'random@random.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'R@nd0mP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
