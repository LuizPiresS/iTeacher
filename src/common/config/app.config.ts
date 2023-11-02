import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  name: string;
  port: number;
}

export default registerAs(
  'app',
  (): Partial<IAppConfig> => ({
    nodeEnv: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    port: Number.parseInt(process.env.APP_PORT, 10) || 3000,
  }),
);
