import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Pizza, Topping } from './app.model';
import { SpinnerService } from './spinner.service';


@Injectable({providedIn:'root'})
export class PizzaApiService {

  constructor(
    private http: HttpClient,
    readonly spinnerSrv: SpinnerService
  ) { }

  get pizzas() {
    return this.simulateHttpGet<Pizza[]>('../assets/mock/pizzas.json').pipe(
      this.spinnerSrv.handleSpinner('pizzas')
      // aquí se realizará el formateo de datos
    );
  }

  get toppings() {
    return this.simulateHttpGet<Topping[]>('../assets/mock/toppings.json').pipe(
      this.spinnerSrv.handleSpinner('toppings')
      // aquí se realizará el formateo de datos
    );
  }



  private simulateHttpGet<T>(endPoint): Observable<T> {
    return this.http.get<T>(endPoint).pipe(
      delay(Math.random() * 5000)
    );
  }

}
