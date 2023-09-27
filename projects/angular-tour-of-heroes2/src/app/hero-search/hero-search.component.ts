import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // (opcion 1)
  // heroes: Hero[];

  // (opcion 2)
  // heroes$: Observable<Hero[]>;

  // (opcion 3)
  private stream = new Subject();
  heroes$: Observable<Hero[]>;


  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit() {
    // (opcion 3)
    this.heroes$ = this.stream.pipe(
      map((query: string) => query ? query.trim() : ''),
      filter(Boolean),
      debounceTime(300),
      distinctUntilChanged(),
      // con switchMap nos aseguramos de que sólo se emitirá la última búsqueda introducida
      // y cancelará las anteriores que hubiera en progreso
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  search(term: string) {
    // (opcion 1)
    // this.heroService.searchHeroes(term).subscribe(heroes => {
    //   this.heroes = heroes;
    // });

    // (opcion 2)
    // this.heroes$ = this.heroService.searchHeroes(term);

    // (opcion 3)
    this.stream.next(term); // EMISOR: insertamos el parámetro 'term' en el stream de datos
  }

  gotoDetail(id) {
    // alternativa a poner en la vista: <a routerLink="/detail/{{hero.id}}">
    this.router.navigate(['/detail', id]);
  }
}
