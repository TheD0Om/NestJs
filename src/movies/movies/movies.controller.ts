import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('trending')
  async getTrendingMovies() {
    return this.moviesService.getTrendingMovies();
  }

  @Get('search')
  async searchMovies(@Query('query') query: string) {
    if (!query) {
      return { error: 'Veuillez fournir un terme de recherche' };
    }
    return this.moviesService.searchMovies(query);
  }
}
