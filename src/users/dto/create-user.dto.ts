import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;
}
