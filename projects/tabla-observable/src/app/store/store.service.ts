import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, tap } from 'rxjs';


/**
 * Store Común
 * 
 * @template T 
 */
@Injectable({
  providedIn: 'root'
})
export abstract class StoreService<T> {
  private readonly _stateSubject = new BehaviorSubject<T>(undefined);
  private _state$: Observable<T>;
  
  // la implementación del siguiente método abstracto debe proporcionarse en la clase derivada (la clase que extiende de esta):
  abstract loadStoreData(): Observable<T> | T;

  public getState(): Observable<T> {
    if (!this._state$) {
      this._state$ = this._stateSubject.pipe(
        tap(stateData => {
          if (stateData === undefined) {
            const stateData = this.loadStoreData();
            if (stateData instanceof Observable) {
              // comento este bloque, pq creo que es más sencillo el seteo de los datos en el subscribe, en lugar de hacerlo con un 'tap':
              // stateData.pipe(
              //   tap((stateData: T) => this.state = stateData),
              //   ignoreElements()
              // ).subscribe();
              stateData.subscribe((stateData: T) => this.state = stateData);
            } else {
              this.state = stateData;
            }
          }
        }),
        filter(stateData => stateData !== undefined),
        shareReplay(1),
        tap(x => console.log('obtenido del store: ', x))
      );
    }
    return this._state$;
  }

  protected get state(): T {
    return this._stateSubject.getValue();
  }

  protected set state(state: T) {
    this._stateSubject.next(state);
  }

}
