import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class UserInputDTO {
  @ApiProperty({
    description: 'User email that will be used to login',
    example: 'random@random.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password must contain at least one uppercase letter, one special character and one number and be made up of at least 8 characters.',
    example: 'R@nd0mP@ssw0rd',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Confirmation of the password',
    example: 'R@nd0mP@ssw0rd',
  })
  @IsStrongPassword()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
