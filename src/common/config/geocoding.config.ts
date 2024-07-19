import { registerAs } from '@nestjs/config';

export default registerAs('geocoding', () => ({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_LOCATION_ENDPOINT,
  indexName: process.env.AWS_LOCATION_INDEX_NAME,
}));
