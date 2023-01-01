import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;

  @ValidateIf((o) => o.password)
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  public confirmPassword: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;
}
