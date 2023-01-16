import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from './repositories/users.repository';
import { UsersEntity } from './entities/users.entity';
import { IdDto } from './dto/id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUser, Profile, UpdateUser } from './types/users';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  public async create(data: CreateUserDto): Promise<CreateUser> {
    const hashedPassword = await this.hashPassword(data.password);
    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.sendEmail(
      user.email,
      'iTecher - Vefiricação de conta',
      'Seu código de verificação é: 123456', // TODO: criar gerador de código de verificação
    );
    return this.usersEntityToCreateUser(user);
  }

  public async profile(id: IdDto): Promise<Profile> {
    const data = await this.usersRepository.findUserById(id.id);
    return this.usersEntityToProfile(data);
  }

  public async update(data: UpdateUserDto, id: string): Promise<UpdateUser> {
    const hashedPassword = await this.hashPassword(data.password);

    const result = await this.usersRepository.update(
      { ...data, password: hashedPassword },
      id,
    );
    return this.usersEntityToUpdateUser(result);
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

  private usersEntityToCreateUser(data: UsersEntity): CreateUser {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  }

  private usersEntityToProfile(data: UsersEntity): Profile {
    return {
      addressCity: data.addressCity,
      addressCountry: data.addressCountry,
      addressState: data.addressState,
      addressStreet: data.addressStreet,
      addressZip: data.addressZip,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      photoUrl: data.photoUrl,
    };
  }

  private usersEntityToUpdateUser(data: UsersEntity): UpdateUser {
    return {
      addressCity: data.addressCity,
      addressCountry: data.addressCountry,
      addressState: data.addressState,
      addressStreet: data.addressStreet,
      addressZip: data.addressZip,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      photoUrl: data.photoUrl,
    };
  }
}
