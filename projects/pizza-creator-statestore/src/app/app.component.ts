import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PizzaStoreService } from './pizza-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  pizzas$;
  toppings$;
  selectedToppings$;
  isLoading: boolean;

  constructor(
    public pizzaStore: PizzaStoreService
  ) {}

  ngOnInit() {
    this.pizzas$ = this.pizzaStore.select('pizzas');
    this.toppings$ = this.pizzaStore.select('toppings');
    this.selectedToppings$ = this.pizzaStore.select('selectedToppings');
  }

  onSelectTopping(topping) {
    this.pizzaStore.updateToppings(topping);
  }

  onNewPizza(newPizza) {
    this.pizzaStore.addPizza(newPizza);
    this.pizzaStore.reset('selectedToppings');
  }

}
