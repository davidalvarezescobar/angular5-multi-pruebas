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
    return this.http.get('/assets/mocks/fondos_2025.json').pipe(
      map((funds:any) => funds.filter(fund => fund.tipoProductoEnum.includes('FONDOS'))),
      map((funds:any) => funds.map(fund => {
        let ratio3 = '0';
        if (fund.yearTres && fund.volatilidadYearTres) {
          ratio3 = (fund.yearTres / fund.volatilidadYearTres).toFixed(2);
        }
        return {...fund, ratio3};
      })),
      map((funds:any) => funds.map(fund => {
        let ratio1 = '0';
        if (fund.yearUno && fund.volatilidadYearUno) {
          ratio1 = (fund.yearUno / fund.volatilidadYearUno).toFixed(2);
        }
        return {...fund, ratio1};
      })),
      map((funds:any) => funds.filter(fund => {
        return !fund.nombre.toUpperCase().includes('INDIA') &&
        !fund.nombre.toUpperCase().includes('EUROPEAN') &&
        !fund.nombre.toUpperCase().includes('ASIAN') &&
        !fund.nombre.toUpperCase().includes('JAPAN') &&
        !fund.nombre.toUpperCase().includes('INDUSTRIALS') &&
        !fund.nombre.toUpperCase().includes('HEALTHSCIENCE') &&
        !fund.nombre.toUpperCase().includes('TECHNOLOGY') &&
        !fund.nombre.toUpperCase().includes('INTELLIGENCE') &&
        !fund.nombre.toUpperCase().includes('ENERGY') &&
        !fund.nombre.toUpperCase().includes('EMERGING') &&
        !fund.nombre.toUpperCase().includes('INSURANCE') &&
        !fund.nombre.toUpperCase().includes('RUSSIA') &&

        fund.ter < 1.9 &&

        // SÓLO RENTA VARIABLE
        // fund.tipoActivo.toUpperCase().includes('RENTA VARIABLE') &&
        // fund.rentabilidadPasadaDos > -4 &&
        // fund.volatilidadYearTres < 10

        // CASI SIN PÉRDIDAS LOS ÚLTIMOS AÑOS
        // fund.rentabilidadPasadaCuatro > 0 &&
        // fund.rentabilidadPasadaTres > 0 &&
        // fund.rentabilidadPasadaDos > 0 &&
        // fund.rentabilidadPasadaUno > 0 &&
        // fund.ytd > 1

        // VOLATILIDAD ENTRE 2 y 5
        // fund.volatilidadYearTres < 5 && fund.volatilidadYearTres > 2 &&
        // fund.ytd > 4 // a finales de año
        // fund.ytd > 1.3 // a principios de año

        // CUASI MONETARIOS
        // fund.volatilidadYearTres <= 2 &&
        // fund.ytd > 3 // a finales de año
        // fund.ytd >= 1 // a principios de año

        // RATIO3
        // fund.ratio3 > 1 &&
        // fund.ytd > 3

        // RATIO1
        fund.ratio1 > 4 &&
        fund.ytd > 2

        // rentabilidadPasadaCuatro -> 2020
        // rentabilidadPasadaDos -> 2022
      }))
    );
  }
}
