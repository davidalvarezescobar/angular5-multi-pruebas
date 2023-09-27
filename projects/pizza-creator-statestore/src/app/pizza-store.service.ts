import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { PizzaState, Pizza, Topping } from './app.model';
import { PizzaApiService } from './pizza-api.service';


const pizzaState: PizzaState = {
  pizzas: undefined,
  toppings: undefined,
  selectedToppings: []
};


@Injectable()
export class PizzaStoreService extends StoreService<PizzaState> {

  constructor(pizzaApi: PizzaApiService) {
    super(pizzaState, pizzaApi, 'pizza-store');
  }

  // private addTopping(topping) {
  //   const selectedToppings = this.getState('selectedToppings');
  //   this.setState('selectedToppings', [...selectedToppings, topping]);
  // }

  // private removeTopping(topping) {
  //   const selectedToppings = this.getState('selectedToppings');
  //   this.setState('selectedToppings', selectedToppings.filter(t => t !== topping));
  // }

  updateToppings(topping) {
    const selectedToppings = this.getState('selectedToppings');
    const index = selectedToppings.indexOf(topping);
    if (!!~index) { // si es true, o sea si existe, lo BORRAMOS
      this.setState('selectedToppings', selectedToppings.filter(t => t !== topping));

    } else { // si es false, lo AÑADIMOS
      this.setState('selectedToppings', [...selectedToppings, topping]);
    }
  }

  add(stateName: string, value) {
    const actualState = this.getState(stateName);
    this.setState(stateName, [...actualState, value]);
  }

  reset(stateName) {
    this.setState(stateName, pizzaState[stateName]);
  }

}
