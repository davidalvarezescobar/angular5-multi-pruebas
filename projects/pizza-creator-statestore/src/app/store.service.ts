import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, filter, ignoreElements, map, shareReplay, tap } from 'rxjs/operators';

export function initState<T>(fn: Function): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(
    tap(stateData => {
      if (stateData === undefined) {
        fn().pipe(ignoreElements()).subscribe();
      }
    }),
    shareReplay(1),
    filter(stateData => stateData !== undefined),
    tap(x => console.log('%cObtenemos del Store: ', 'color: green; font-weight: bold', x))
  );
}

export abstract class StoreService<T> {
  private _state$: BehaviorSubject<T>;
  readonly state$: Observable<T>;


  constructor(
    initialState: T,
    private sessionStorageKey?: string
  ) {
    if (sessionStorageKey && sessionStorage.getItem(sessionStorageKey)) {
      initialState = JSON.parse(sessionStorage.getItem(sessionStorageKey));
    }
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }


  protected selectState(name: string): Observable<Partial<T>> {
    return this.state$.pipe(
      tap(() => console.log(`%cQueremos obtener del Store: ${name}`, 'color: orange')),
      map((stateData: T) => stateData?.[name]),
      distinctUntilChanged()
    );
  }

  private get state(): T {
    return this._state$.value;
  }

  protected setState(name: string, data: Partial<T>): void {
    this._state$.next({...this.state, [name]: data}); // ésta línea generaba un error de compilación, fixed in TypeScript Version 3.2
    // this._state$.next(Object.assign({}, this.store, {[name]: data})); // esta era una alternativa a la anterior línea
    if (this.sessionStorageKey) {
      sessionStorage.setItem(`${this.sessionStorageKey}`, JSON.stringify(this.state));
    }
  }

  protected getState(name: string): Partial<T> {
    return this.state[name];
  }

}
