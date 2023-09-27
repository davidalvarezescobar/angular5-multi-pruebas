import { BehaviorSubject, filter, Observable, shareReplay, tap, MonoTypeOperatorFunction } from 'rxjs';


export function initStore<T>(fn: Function): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(
    tap(eventos => {
      if (eventos === undefined) {
        fn().subscribe();
      }
    }),
    shareReplay(1),
    filter(Boolean),
    tap(x => console.log('obtenido del store: ', x))
  );
}

export abstract class StoreService<T> {
  protected _store: BehaviorSubject<T>;
  protected store$: Observable<T>;

  constructor(initialState?: T) {
    this._store = new BehaviorSubject(initialState);
    if (initialState !== undefined) {
      this.store$ = this._store.asObservable();
    }
  }

  protected get store(): T {
    return this._store.getValue();
  }

  protected set store(state: T) {
    this._store.next(state);
  }

}
