import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        logger: true,
        debug: true,
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
