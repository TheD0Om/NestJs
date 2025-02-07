import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') || '';
    this.apiUrl = 'https://api.themoviedb.org/3';
  }

  async getTrendingMovies() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/trending/movie/week`, {
          params: { api_key: this.apiKey },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des films tendances');
    }
  }

  async searchMovies(query: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/search/movie`, {
          params: { api_key: this.apiKey, query },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la recherche des films');
    }
  }
}
