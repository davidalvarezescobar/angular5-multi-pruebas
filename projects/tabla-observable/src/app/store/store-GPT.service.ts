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
  private readonly _stateSubject = new BehaviorSubject<T | null>(null);
  private readonly _state$: Observable<T>;

  // Método abstracto que debe implementar la clase derivada
  abstract loadStoreData(): Observable<T> | T;

  constructor() {
    this._state$ = this._stateSubject.asObservable().pipe(
      filter((state) => state !== null), // Filtramos valores nulos
      shareReplay(1)
    );
  }

  // Método público para obtener el estado
  public getState(): Observable<T> {
    if (this.state === null) {
      const data = this.loadStoreData();
      if (data instanceof Observable) {
        data.subscribe((newState) => (this.state = newState));
      } else {
        this.state = data;
      }
    }
    return this._state$;
  }

  // Getters y setters protegidos para manipular el estado
  protected get state(): T | null {
    return this._stateSubject.getValue();
  }

  protected set state(newState: T | null) {
    this._stateSubject.next(newState);
  }
}

