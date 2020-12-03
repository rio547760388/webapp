import { Injectable } from '@angular/core';
import { HEROES } from './heros';
import { Observable, of, Subscriber } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('fetch data');
    return of(HEROES);
  }
}
