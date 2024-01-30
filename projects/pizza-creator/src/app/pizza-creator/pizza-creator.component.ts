import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza, PizzaService, StateProps, Topping } from '../pizza.service';

@Component({
  selector: 'app-pizza-creator',
  templateUrl: './pizza-creator.component.html',
  styleUrls: ['./pizza-creator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaCreatorComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  toppings$: Observable<Topping[]>;

  constructor(
    private pizzaService: PizzaService
  ) { }

  ngOnInit() {
    this.pizzas$ = this.pizzaService.select<Pizza[]>(StateProps.pizzas);
    this.toppings$ = this.pizzaService.select<Topping[]>(StateProps.toppings);
  }

  addPizza(pizza: Pizza) {
    this.pizzaService.addPizza(pizza);
  }

}
