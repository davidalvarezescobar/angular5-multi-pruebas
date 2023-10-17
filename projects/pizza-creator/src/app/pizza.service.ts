import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import dataFromBack from '../assets/pizza.json';

export interface Pizza {
  name: string;
  toppings: Topping[];
}

export type Topping = string;             // se puede "tipar" por tipo de contenido, que en este caso seria un string...
// export type Saludo = 'hola' | 'adios'; // ... o especificando directamente los valores que va a soportar

export interface State {
  pizzas: Pizza[];
  toppings: Topping[];
}


@Injectable()
export class PizzaService {
  private _subject$ = new BehaviorSubject(dataFromBack);
  store$ = this._subject$.asObservable();

  select(name) {
    return this.store$.pipe(
      tap(_ => console.log('store:', _)),
      map((storeData: State) => storeData?.[name]),
      // distinctUntilChanged() va detrás del map(), ya que
      // si lo ponemos en la línea 28: "store$ = this._subject$.asObservable().pipe(distinctUntilChanged())"
      // no tiene el efecto deseado sobre el stream de datos:
      distinctUntilChanged(),
      tap(_ => console.log('se actualiza...:', _))
    );
  }

  addPizza(pizza) {
    const store = this._subject$.value;
    this._subject$.next({ ...store, pizzas: [...store.pizzas, pizza] });
  }

}
