import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'https://app.myinvestor.es/myinvestor-server/rest/public/fondos/find-fondos?tipo=TODOS&token=a2e8e18ad26a079c576038f0ad4fa18ce0d9e415f5bf6f43f89cf3831a0e4685__';

  constructor(
    readonly http: HttpClient
  ) { }

  getFunds(): Observable<any> {
    // return this.http.get(this.url).pipe(
    return this.http.get('/assets/mocks/fondos.json').pipe(
      tap((x:any) => console.log(x.length)),
      map((funds:any) => funds.filter(fund => fund.tipoProductoEnum !== 'PENSIONES')),
      map((funds:any) => funds.filter(fund => {
        return fund.activosAcciones === 0 && fund.volatilidad > 0 && fund.volatilidad < 4 && fund.ytd > 1;
        // return fund.activosAcciones === 0 && fund.volatilidad > 0 && fund.volatilidad < 1 && fund.ytd > 0;
        // return fund.tipoActivo === "Renta Variable" && fund.volatilidad > 5 && fund.volatilidad < 8 && fund.ytd > 0; // renta variable
      })),
      tap((x:any) => console.log(x.length)),
    );
  }
}
