import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, mapTo, merge, mergeMap, Observable, of, shareReplay, skip, Subject, switchMap, take, tap, timer } from 'rxjs';
import { Hero } from './hero';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// como utilizamos InMemoryDataService, la url siempre se forma con "api + / + nombre_mock" en el servicio 'in-memory-data.service':
const heroesUrl = 'api/heroes';
const pruebaUrl = 'api/prueba';


@Injectable()
export class HeroService {

  private heroesCache$: Observable<Hero[]>;

  public update$ = new Subject<void>();
  public showNotifications$: Observable<boolean>;

  private numHeroes = 0;


  constructor(
    private http: HttpClient
  ) { }


  getHeroesCache() {
    if (!this.heroesCache$) {
      // // CACHÉ SIN REFRESCO:
      // this.heroesCache$ = this.getHeroes().pipe(
      //   tap(x => console.log(x)),
      //   shareReplay(1) // nuevos suscriptores no obtendrán los datos de nuevas llamadas http, si no del último resultado cacheado
      // );

      // // CACHÉ CON REFRESCO AUTOMÁTICO:
      // const timer$ = timer(0, 10000); // timer$ hace las veces de 'frecuencia portadora' -> (OUTER)
      // this.heroesCache$ = timer$.pipe(
      //   // Cada 10 segundos se ejecuta el contenido del pipe
      //   tap(x => console.log(x)),  // x --> [0, 1, 2, 3, 4...]
      //   switchMap(outer => {       // map a observables => usar “switchMap”;  map a objectos, arrays, etc => usar “map”
      //     return this.getHeroes(); // this.getHeroes(), retorna un observable -> (INNER)
      //   }),
      //   shareReplay(1) // el resultado es cacheado, hasta que se actualice el stream outer
      // );

      // // CACHÉ CON REFRESCO MANUAL:
      // const clicks$ = this.update$; // OUTER (clicks)
      // const manual$ = clicks$.pipe(
      //   tap(outer => console.log('OUTER:', 'click')),
      //   switchMap(outer => {
      //     return this.getHeroes(); // INNER
      //   })
      // );
      // this.heroesCache$ = this.getHeroes().pipe(
      //   merge(manual$),
      //   shareReplay(1) // el resultado es cacheado, hasta que se actualice el stream outer
      // );

      // CACHÉ COMPLETO
      const clicks$ = this.update$; // OUTER (clicks)
      const takeOne$ = this.getHeroesTakeOne(); // INNER (nos quedamos sólo con la primera response)
      const manualUpdate$ = clicks$.pipe(
        mergeMap(x => takeOne$) // obtendremos los heroes mediante sucesivos clicks en el botón UPDATE
      );

      // El observable al que nos suscribiremos consta de un merge entre 2 observables:
      // 1- takeOne$, observable que muestra un único resultado y se autocancela
      // 2- manualUpdate$, observable que muestra las sucesivas actualizaciones
      this.heroesCache$ = takeOne$.pipe(
        merge(manualUpdate$),
        tap((h: Hero[]) => this.numHeroes = h.length ),
        shareReplay(1) // el resultado final es el que cacheamos
      );

      // Control de notificaciones
      const notifications$ = this.getHeroesTakeRest(); // omitimos la primera http response y nos quedamos con las demás
      const show$ = notifications$.pipe( mapTo(true) ); // TRUE: por cada http response
      const hide$ = this.update$.pipe( mapTo(false) ); // FALSE: por cada click en el botón update
      // como mergeamos los observables show$ y hide$, el observable resultante showNotifications$ se verá actualizado:
      // 1- cada vez que nos llegue una http response
      // 2- cada vez que hagamos click en el botón update
      this.showNotifications$ = show$.pipe(
        merge(hide$),
        tap(x => console.log(x))
      );

    }

    return this.heroesCache$;
  }

  getHeroesTakeOne() {
    return this.getHeroesAuto().pipe(
      tap(x => console.log('TAKEONE: ---|')),
      take(1), // take obtiene el primer resultado del observable principal y, cancela la suscripción
      tap(x => console.log('TAKEONE:    |--->'))
    );
  }

  getHeroesTakeRest() {
    return this.getHeroesAuto().pipe( // skip omite el primer resultado del observable principal
      tap(x => console.log('TAKEREST: ---|') ),
      skip(1),
      tap(x => console.log('TAKEREST:    |--->') ),
      filter((h: Hero[]) => h.length > this.numHeroes)
    );
  }

  getHeroesAuto() {
    const outer$ = timer(0, 10000); // OUTER
    const inner$ = this.getHeroes(); // INNER
    return outer$.pipe( // combined
      switchMap(outer => inner$) // Éste sería el observable principal: cada 10 segundos realizamos una petición para obtener los heroes
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(heroesUrl)
      .pipe(
        catchError( this.handleError<Hero[]>('getHeroes', []) )
      );
  }


  getHero(id: number): Observable<Hero> { // buscamos por id
    return this.http.get<Hero>(`${heroesUrl}/${id}`)
      .pipe(
        catchError( this.handleError<Hero>(`getHero id=${id}`) )
      );
  }

  searchHeroes(name: string): Observable<Hero[]> {
    if (!name.trim()) { return of([]); }
    return this.http.get<Hero[]>(`${heroesUrl}/?name=${name}`)
      .pipe(
        catchError( this.handleError<Hero[]>(`searchHeroes name=${name}`) )
      );
  }

  deleteHero(id: number) {
    return this.http.delete(`${heroesUrl}/${id}`, httpOptions)
      .pipe(
        catchError( this.handleError(`deleteHero id=${id}`) )
      );
  }

  addHero(hero): Observable<Hero> {
    return this.http.post<Hero>(heroesUrl, hero, httpOptions)
      .pipe(
        catchError( this.handleError<Hero>(`addHero id=${hero.name}`, hero) )
      );
  }

  updateHero(hero) {
    return this.http.put(heroesUrl, hero, httpOptions)
      .pipe(
        catchError( this.handleError<Hero>(`updateHero id=${hero.id}`, hero) )
      );
  }

  handleError<T>(msj, retorno?: T) {
    // Con el siguiente console.log NO sólo hacemos log cuando se produce un error (puesto que se llama desde 'catchError'),
    // sino en cualquier actualizacion del stream de datos
    console.log(msj);
    return function(err, caught) { // ésta es la 'function selector' asociada a 'catchError' (ver más abajo)
      console.log(`ERROR en ${msj}`, caught);
      const newHero = retorno['id'] = 1;
      return of(retorno); // este return, será interpretado con un OK por el ".subscribe()"
   // return new ErrorObservable('algo ha salido mal'); // este return, será interpretado como un KO por el ".subscribe()"
    };
  }

  // catchError =>
  // @param {function selector}, a function that takes 2 arguments:
  //   `err` -> which is the error
  //   `caught` -> which is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
  //   is returned by the `selector` will be used to continue the observable chain.
  // @return {Observable} An observable that originates from either the source or the observable returned by the
  //   catch `selector` function.



  getPrueba(): Observable<any> {
    return this.http.get<any>(pruebaUrl);
  }

  createAutomaticHeroes() {
    // Inicio proceso para introducir automaticamente heroes cada x segundos:
    timer(0, 25000).pipe(
      switchMap(i => this.addHero({name: 'Automatic' + i} as Hero) )
    ).subscribe();
  }
}
