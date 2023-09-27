import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { Pizza, Topping } from '../pizza.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-creator',
  templateUrl: './pizza-creator.component.html',
  styleUrls: ['./pizza-creator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaCreatorComponent implements OnInit {
  pizzas$;
  toppings$;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzas$ = this.pizzaService.select('pizzas');
    this.toppings$ = this.pizzaService.select('toppings');
  }

  addPizza(pizza) {
    this.pizzaService.addPizza(pizza);
  }

}
