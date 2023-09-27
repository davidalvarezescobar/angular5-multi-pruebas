import { Injectable } from '@angular/core';
import { ignoreElements, Observable, tap } from 'rxjs';
import { HttpService } from './http.service';
import { initStore, StoreService } from './store.service';


@Injectable()
export class StoreEventosService extends StoreService<any> {

  constructor(
    readonly httpSrv: HttpService
  ) {
    super();
  }

  getStore(searchDesc?: string): Observable<any> {
    if (!this.store$) {
      this.store$ = this._store.pipe(
        initStore(() => this.loadEventos())
      );
    }
    return this.store$;
  }

  loadEventos(searchDesc?: string) {
    return this.httpSrv.getListadoEventos(searchDesc).pipe(
      tap((data: any) => this.store = this.formatEventos(data)),
      ignoreElements()
    );
  }

  formatEventos(data: any[]) {
    return data.map(({ borrame, ...rest }) => {
      return rest;
    });
  }

}
