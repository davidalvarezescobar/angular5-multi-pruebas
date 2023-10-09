import { Injectable } from '@angular/core';
import dataFromBack from '../../../../assets/demo-pizza.json';
import { IToppingItem } from './pizza-form.interface';
import { PizzaFormService } from './pizza-form.service';


@Injectable()
export class PizzaLoaderService {

  constructor(
    private pizzaFormService: PizzaFormService
  ) { }

  loadPizzaData(): void {
    const demoPizzaData = { ...dataFromBack };
    // rellenamos los datos del formGroup 'customerDetails':
    this.pizzaFormService.form.patchValue({
      customerDetails: demoPizzaData.customerDetails
    });

    // rellenamos los datos del formArray 'pizzas'
    for (const pizza of demoPizzaData.pizzas) {
      const group = this.pizzaFormService.addPizza();
      group.patchValue({
        size: pizza.size,
        toppings: this.prefillToppingsSelection(group.get('toppings').value, pizza.toppings)
      });
    }
    this.pizzaFormService.setCurrentPizza();
  }

  prefillToppingsSelection(toppings: IToppingItem[], selectedToppings: string[]): IToppingItem[] {
    return toppings.map((t) => {
      if (selectedToppings.includes(t.name.toUpperCase())) {
        t.selected = true;
      }

      return t;
    });
  }
}
