import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesurl = 'api/movies';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesurl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
        );
  }

  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesurl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  updateMovie (movie: Movie): Observable<any> {
    return this.http.put(this.moviesurl, movie, httpOptions).pipe(
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesurl, movie, httpOptions).pipe(
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesurl}/${id}`;

    return this.http.delete<Movie>(url, httpOptions).pipe(
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  constructor(private http: HttpClient) { }
}
