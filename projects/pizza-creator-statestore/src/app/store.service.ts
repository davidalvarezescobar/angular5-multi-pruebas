import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { pluck, tap, distinctUntilChanged, filter } from 'rxjs/operators';


export abstract class StoreService<T> {
  private _store$: BehaviorSubject<T>;
  readonly store$: Observable<T>;


  constructor(
    initialState: T,
    private apiService?,
    private sessionStorageKey?: string
  ) {
    if (sessionStorageKey && sessionStorage.getItem(sessionStorageKey)) {
      initialState = JSON.parse(sessionStorage.getItem(sessionStorageKey));
    }
    this._store$ = new BehaviorSubject(initialState);
    this.store$ = this._store$.asObservable();
  }


  public select(name: string) {
    return this.store$.pipe(
      tap(_ => console.log(`suscrito por: ${name}:`, _)),
      pluck(name),
      distinctUntilChanged(),
      tap(data => {
        if (data === undefined) { this.loadData(name); }
      }),
      filter(data => data !== undefined),
      tap(_ => console.log(` ${name}: pasa el filtro`, _))
    );
  }

  private loadData(name: string) {
    this.apiService[name].subscribe(data => {
      this.setState(name, data);
    });
  }

  private get store() {
    return this._store$.value;
  }

  protected setState(name: string, data) {
 // this._store$.next({...this.store, [name]: data}); // ésta línea genera un error de compilación, fixed in TypeScript Version 3.2
    this._store$.next(Object.assign({}, this.store, {[name]: data}));
    if (this.sessionStorageKey) {
      sessionStorage.setItem(`${this.sessionStorageKey}`, JSON.stringify(this.store));
    }
  }

  protected getState(name: string) {
    return this.store[name];
  }

}
