import { MessageService } from './../message.service';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  heroes: Hero[];

  hero: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  onChoose(one: Hero) {
    this.hero = one;
    this.messageService.add(`choose hero ${one.name}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (data) => (this.heroes = data),
      (err) => console.log(err)
    );
  }
}
