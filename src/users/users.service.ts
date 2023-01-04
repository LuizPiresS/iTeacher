import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/dto';
import {
  CreateUserResponse,
  UsersRepository,
} from './database/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailAlreadyInUseError } from '../common/errors/types/email-already-in-use-error';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  public async create(data: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.usersRepository.findUserByEmail(data.email);
    if (user) {
      throw new EmailAlreadyInUseError('This email is already in use');
    }

    const hashedPassword = await this.hashPassword(data.password);
    const newUser = await this.usersRepository.createNewUser({
      ...data,
      password: hashedPassword,
    });

    await this.sendEmail(
      newUser.email,
      'iTecher - Vefiricação de conta',
      'Seu código de verificação é: 123456',
    );
    console.log('newUser', newUser);
    return newUser;
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  // TODO: mover para um service de email
  private async sendEmail(to: string, subject: string, body: string) {
    // Send email to user
    const response = await this.mailerService.sendMail({
      to,
      from: 'luiz.pires@ranzinza.dev',
      subject,
      text: body,
    });

    return response;
  }
}
