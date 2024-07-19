import { Injectable, Logger } from '@nestjs/common';
import {
  LocationClient,
  SearchPlaceIndexForTextCommand,
} from '@aws-sdk/client-location';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);
  private readonly indexName: string;

  constructor(
    private readonly locationClient: LocationClient,
    private readonly configService: ConfigService,
  ) {
    this.indexName = this.configService.get<string>('geocoding.indexName');
  }

  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    const command = new SearchPlaceIndexForTextCommand({
      IndexName: this.indexName,
      Text: address,
    });

    try {
      const response = await this.locationClient.send(command);
      const results = response.Results;

      if (results.length === 0) {
        throw new Error('No results found for the given address');
      }

      const location = results[0].Place.Geometry.Point;
      return { lat: location[1], lng: location[0] };
    } catch (error) {
      this.logger.error(
        `Failed to get coordinates for address: ${error.message}`,
      );
      throw error;
    }
  }
}
