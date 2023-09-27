import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { pluck, tap, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { PizzaState, Pizza, Topping } from './pizza-state.service';

export type Topping = string; // S?LO ES UN DATO, POR ESO EST? COMO type EN LUGAR DE interface
export interface Pizza {
  name: string;
  toppings: string[];
}
export interface PizzaState {
  pizzas: Pizza[];
  toppings: Topping[];
  selectedToppings: Topping[];
}

@Injectable()
export class AppService extends StoreService<PizzaState> {

  constructor(private http: HttpClient) {
    super({
      pizzas: undefined,
      toppings: undefined,
      selectedToppings: []
    }, 'pizza-store');

    super.setLoadDataList({
      pizzas: this.loadPizzas(),
      toppings: this.loadToppings()
    });
  }

  private addTopping(topping) {
    const selectedToppings = this.getState('selectedToppings');
    this.setState('selectedToppings', [...selectedToppings, topping]);
  }

  private removeTopping(topping) {
    // this.store.pizzas = undefined; // seteando a undefined, fuerzo una nueva petición http para las pizzas
    const selectedToppings = this.getState('selectedToppings');
    this.setState('selectedToppings', selectedToppings.filter(t => t !== topping));
  }

  updateToppings(topping) {
    const index = this.store.selectedToppings.indexOf(topping);
    if (!!~index) { // si es true, o sea si existe, lo quitamos
      this.removeTopping(topping);

    } else { // si es false, lo añadimos
      this.addTopping(topping);
    }
  }


  private loadPizzas() {
    return this.simulateHttpGet<Pizza[]>('../assets/mock/pizzas.json').pipe(
      // aquí se realizará el formateo de datos
    );
  }

  private loadToppings() {
    return this.simulateHttpGet<Topping[]>('../assets/mock/toppings.json').pipe(
      // aquí se realizará el formateo de datos
    );
  }

  private simulateHttpGet<T>(endPoint): Observable<T> {
    return this.http.get<T>(endPoint).pipe(
      // delay(Math.random() * 4000) // Para simular el retraso de una petición, mejor poner el 'delay' en el interceptor
    );
  }

}
