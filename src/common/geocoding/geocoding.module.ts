import { Global, Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocationClient } from '@aws-sdk/client-location';
import geocodingConfig from '../config/geocoding.config';
import { GeocodingService } from './domain/services/geocoding.service';

@Global()
@Module({
  imports: [ConfigModule.forFeature(geocodingConfig)],
  providers: [
    {
      provide: LocationClient,
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('LocationClient');
        const clientConfig: any = {
          region: configService.getOrThrow<string>('geocoding.region'),
          credentials: {
            accessKeyId: configService.getOrThrow<string>(
              'geocoding.accessKeyId',
            ),
            secretAccessKey: configService.getOrThrow<string>(
              'geocoding.secretAccessKey',
            ),
          },
          endpoint: configService.getOrThrow<string>('geocoding.endpoint'), // Utilize o endpoint do LocalStack
        };

        const client = new LocationClient(clientConfig);

        // Log Location client configuration
        logger.log(
          `Location Client configured with region: ${configService.get<string>(
            'geocoding.region',
          )}`,
        );

        return client;
      },
      inject: [ConfigService],
    },
    GeocodingService,
  ],
  exports: [GeocodingService],
})
export class GeocodingModule {}
