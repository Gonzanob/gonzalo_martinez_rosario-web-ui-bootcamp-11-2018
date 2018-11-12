import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      {id: 1, name: "harry potter", duration: 123},
      {id: 2, name: "terminator", duration: 120},
      {id: 3, name: "nemo", duration: 80},
      {id: 4, name: "star wor", duration: 999}
    ];

    return {movies};
  }

  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;
  }
  constructor() { }
}
