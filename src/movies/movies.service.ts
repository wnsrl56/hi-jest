import { NotFoundException, Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id:string):Movie {
    const movie =  this.movies.find(({id:movieId}) => Number(id) === movieId);
    if(!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    })
  }

  remove(id:string) {
    this.getOne(id);
    this.movies = this.movies.filter(({id:movieId}) => Number(id) !== movieId);
  }

  update(id:string, updateData) {
    const movie = this.getOne(id);
    this.remove(id);
    this.movies.push({...movie, ...updateData})
  }
}
