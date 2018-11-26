import { Injectable } from '@angular/core';
import { playlist_simple } from './playlist_simple';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Paging_Object } from './paging_object';
import { search_interface } from './search_interface';
import { user_object } from './user_object';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SpotiapiService {
  constructor(private http: HttpClient) { }
  
  private playlist_url: string = 'http://localhost:8888/playlist';
  private search_url: string = 'http://localhost:8888/search/';
  private last_searched_url: string = 'http://localhost:8888/last_searched';
  private logged_url: string = "http://localhost:8888/amiloggedin";
  private user_url: string = "http://localhost:8888/userdata"

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  areWeLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(this.logged_url)
      .pipe(
        catchError(this.handleError('areWeLoggedIn', false))
      );
  }

  getLastSearched(): Observable<search_interface[]> {
    return this.http.post<search_interface[]>(this.last_searched_url, null)
      .pipe(
        catchError(this.handleError('getLastSearched', [])
      ));
  }

  getPlaylists(): Observable<playlist_simple[]> {
    return this.http.get<playlist_simple[]>(this.playlist_url)
      .pipe(
        catchError(this.handleError('getPlaylists', [])
      ));
  }

  getUserInfo(): Observable<user_object> {
    return this.http.post<user_object>(this.user_url, null)
      .pipe(
        catchError(this.handleError('getUserInfo', null))
      );
  }

  search( to_search : search_interface): Observable<Paging_Object[]> {
    return this.http.get<Paging_Object[]>(this.search_url + JSON.stringify(to_search))
      .pipe(
        catchError(this.handleError('search', [])
        )
      );
  }
  
}
