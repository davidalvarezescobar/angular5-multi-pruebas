import { Component } from '@angular/core';
import { HeroService } from './hero.service';

import { share, switchMap, tap } from 'rxjs/operators';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public heroService: HeroService) {
    // this.test();
    this.heroService.createAutomaticHeroes();
  }

  stopSubscription() {
    this.heroService.forceReload();
  }

  reload() {
    this.heroService.update$.next();
  }



  // ESPACIO PARA PRUEBAS:
  private test() {
      const refresco$ = timer(0, 10000).pipe(
        tap(outer => console.log('OUTER:', outer))
      ); // outer
      const heroes$ = this.heroService.getHeroes().pipe( // inner
        tap(inner => console.log('INNER:', inner))
      );
      const combined$ = refresco$.pipe( // combined
        switchMap(outer => heroes$),
        share() // el resultado es cacheado, hasta que se actualice el stream outer
      );
      const heroesCache$ = combined$;
    // aunque hay varios suscriptores, gracias al share/shareReplay sólo se realiza una llamada http
    // shareReplay ~= publishReplay + refCount (se ejecuta en diferente ciclo)
    // share 		   ~= publish + refCount (se ejecuta en el mismo ciclo)
    heroesCache$.subscribe(_ => console.log('suscriptor1:', _));
    heroesCache$.subscribe(_ => console.log('suscriptor2:', _));
    heroesCache$.subscribe(_ => console.log('suscriptor3:', _));

    this.heroService.getPrueba().subscribe(_ => console.log('prueba:', _));
  }
}
