import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza, Topping } from './app.model';


@Injectable()
export class PizzaApiService {

  constructor(private http: HttpClient) { }

  get pizzas() {
    return this.simulateHttpGet<Pizza[]>('../assets/mock/pizzas.json').pipe(
      // aquí se realizará el formateo de datos
    );
  }

  get toppings() {
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
