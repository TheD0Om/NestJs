import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): string {
    return 'API pour la gestion des réservations de films';
  }
}
