import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Pizza, PizzaState, Topping } from './app.model';
import { PizzaApiService } from './pizza-api.service';
import { initState, StoreService } from './store.service';


const pizzaState: PizzaState = {
  pizzas: undefined,
  toppings: undefined,
  selectedToppings: []
};


@Injectable({providedIn:'root'})
export class PizzaStoreService extends StoreService<PizzaState> {

  constructor(
    readonly pizzaApi: PizzaApiService
  ) {
    super(pizzaState); // --> OJO: los 'selectedToppings' ya van inicializados on un array vacío! no se necesita llamada a back!!
    // super(pizzaState, 'pizza-store'); // opción con almacenado de datos en SessionStorage
  }

  select(name: string) {
    return this.selectState(name).pipe(
      initState(() => this.load(name))
    );
  }

  load(name: string) {
    return this.pizzaApi[name].pipe(
      tap((data: any) => this.setState(name, data))
    );
  }

  // private addTopping(topping) {
  //   const selectedToppings = this.getState('selectedToppings');
  //   this.setState('selectedToppings', [...selectedToppings, topping]);
  // }

  // private removeTopping(topping) {
  //   const selectedToppings = this.getState('selectedToppings');
  //   this.setState('selectedToppings', selectedToppings.filter(t => t !== topping));
  // }

  updateToppings(topping: Topping) {
    const selectedToppings = this.getState('selectedToppings') as Topping[];
    const index = selectedToppings.indexOf(topping);
    let toppings;
    if (!!~index) { // si es true, o sea si existe, lo BORRAMOS
      toppings = selectedToppings.filter(t => t !== topping) as Partial<Pizza>;
    } else { // si es false, lo AÑADIMOS
      toppings = [...selectedToppings, topping] as Partial<Pizza>;
    }
    this.setState('selectedToppings', toppings);
  }

  addPizza(newPizza: Pizza) {
    const currPizzas = this.getState('pizzas') as Pizza[];
    const pizzas = [...currPizzas, newPizza] as Partial<Pizza>;
    this.setState('pizzas', pizzas);
  }

  reset(stateName) {
    this.setState(stateName, pizzaState[stateName]);
  }

}
