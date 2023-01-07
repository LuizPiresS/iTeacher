import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from './repositories/users.repository';
import { UsersEntity } from './entities/users.entity';
import { listProfileDto } from './dto/list-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  public async create(data: CreateUserDto): Promise<UsersEntity> {
    const hashedPassword = await this.hashPassword(data.password);
    const newUser = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.sendEmail(
      newUser.email,
      'iTecher - Vefiricação de conta',
      'Seu código de verificação é: 123456', // TODO: criar gerador de código de verificação
    );
    return newUser;
  }

  public async getProfile(id: listProfileDto): Promise<UsersEntity> {
    return this.usersRepository.findUserById(id.id);
  }

  public async update(data: UpdateUserDto): Promise<UsersEntity> {
    return this.usersRepository.update(data);
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
