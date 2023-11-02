import { registerAs } from '@nestjs/config';

interface IMailConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  from: string;
  mailService: string | null;
}

export default registerAs(
  'mail',
  (): Partial<IMailConfig> => ({
    host: process.env.MAIL_HOST,
    port: Number.parseInt(process.env.MAIL_PORT, 10) || 587,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
    mailService: process.env.MAIL_SERVICE,
  }),
);
