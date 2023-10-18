import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { initState, StoreService } from './store.service';


@Injectable({
  providedIn: 'root'
})
export class StoreEventosService extends StoreService<any> {

  constructor(
    readonly httpSrv: HttpService
  ) {
    super();
  }

  getState(searchDesc?: string): Observable<any> {
    if (!this.state$) {
      this.state$ = this._state.pipe(
        initState(() => this.loadEventos())
      );
    }
    return this.state$;
  }

  loadEventos(searchDesc?: string) {
    return this.httpSrv.getListadoEventos(searchDesc).pipe(
      tap((data: any) => this.state = this.formatEventos(data))
    );
  }

  formatEventos(data: any[]) {
    return data.map(({ borrame, ...rest }) => {
      return rest;
    });
  }

}
