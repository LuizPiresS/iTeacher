import { registerAs } from '@nestjs/config';

interface ISwaggerConfig {
  swaggerTitle: string;
  swaggerDescription: string;
}

export default registerAs(
  'swagger',
  (): Partial<ISwaggerConfig> => ({
    swaggerTitle: process.env.SWAGGER_TITLE,
    swaggerDescription: process.env.SWAGGER_DESCRIPTION,
  }),
);
