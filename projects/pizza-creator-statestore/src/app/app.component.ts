import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PreloaderService } from './preloader.service';
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
    public pizzaStore: PizzaStoreService,
    private preloaderSrv: PreloaderService
  ) {}

  ngOnInit() {
    this.pizzas$ = this.pizzaStore.select('pizzas');
    this.toppings$ = this.pizzaStore.select('toppings');
    this.selectedToppings$ = this.pizzaStore.select('selectedToppings');

    this.preloaderSrv.observable$.subscribe(loading => {
      this.isLoading = loading;
      console.log(loading);
    });
  }

  onSelectTopping(topping) {
    this.pizzaStore.updateToppings(topping);
  }

  onNewPizza(newPizza) {
    this.pizzaStore.add('pizzas', newPizza);
    this.pizzaStore.reset('selectedToppings');
  }

}
