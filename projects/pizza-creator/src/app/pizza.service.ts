import { Injectable } from '@angular/core';
import { Pizza, Topping } from './pizza.interface';
import { BehaviorSubject } from 'rxjs';
import { pluck, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface State {
  pizzas: Pizza[];
  toppings: Topping[];
}

const state: State = {
  pizzas: [
    { name: 'New Yorker', toppings: ['Bacon', 'Pepperoni', 'Ham', 'Mushrooms'] },
    { name: 'Hot & Spicy', toppings: ['Jalapenos', 'Herbs', 'Pepperoni', 'Chicken'] },
    { name: 'Hawaiian', toppings: ['Ham', 'Pineapple', 'Sweetcorn'] }
  ],
  toppings: [
    'Bacon', 'Pepperoni', 'Mushrooms', 'Herbs',
    'Chicken', 'Pineapple', 'Ham', 'Jalapenos'
  ]
};


@Injectable()
export class PizzaService {
  private _subject$ = new BehaviorSubject(state);
  store$ = this._subject$.asObservable();

  select(name) {
    return this.store$.pipe(
      tap(_ => console.log('store:', _)),
      pluck(name),
   // distinctUntilChanged() va detrás del pluck(), ya que
   // si lo ponemos en la línea 28: "store$ = this._subject$.asObservable().pipe(distinctUntilChanged())"
   // no tiene el efecto deseado sobre el stream de datos:
      distinctUntilChanged(),
      tap(_ => console.log('se actualiza...:', _))
    );
  }

  addPizza(pizza) {
    const store = this._subject$.value;
    this._subject$.next( {...store, pizzas: [...store.pizzas, pizza]} );
  }

  constructor() { }

}
