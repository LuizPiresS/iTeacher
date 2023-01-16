import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        logger: true,
        debug: true,
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthorizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
