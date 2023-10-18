import { BehaviorSubject, filter, Observable, shareReplay, tap, MonoTypeOperatorFunction, ignoreElements } from 'rxjs';


export function initState<T>(fn: Function): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(
    tap(stateData => {
      if (stateData === undefined) {
        fn().pipe(ignoreElements()).subscribe();
      }
    }),
    shareReplay(1),
    filter(stateData => stateData !== undefined),
    tap(x => console.log('obtenido del store: ', x))
  );
}

export abstract class StoreService<T> {
  protected _state: BehaviorSubject<T>;
  protected state$: Observable<T>;

  constructor(initialState?: T) {
    this._state = new BehaviorSubject(initialState);
    if (initialState !== undefined) {
      this.state$ = this._state.asObservable();
    }
  }

  protected get state(): T {
    return this._state.getValue();
  }

  protected set state(state: T) {
    this._state.next(state);
  }

}
