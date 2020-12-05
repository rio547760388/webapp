import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  url = '/api/heroes';

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.url).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.errorHandler('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`fetch Hero ${id}`);
    return this.httpClient.get<Hero>(`${this.url}/${id}`).pipe(
      tap(_ => this.log('fetched hero')),
      catchError(this.errorHandler<Hero>(`fetch hero faild id=${id}`))
    );
  }

  save(hero: Hero) {}

  errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string) {
    this.messageService.add(message);
  }
}
