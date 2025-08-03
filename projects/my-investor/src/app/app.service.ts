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
      map((funds: any) => funds.filter(fund => fund.tipoProductoEnum.includes('FONDOS'))),
      map((funds: any) => funds.filter(fund => fund.yearTres)),
      map((funds: any) => funds.map(fund => {
        let ratio3 = '0';
        const rentabilidadSinRiesgo = 3; // en porcentaje anual

        if (fund.yearTres && fund.volatilidadYearTres) {
          ratio3 = ((fund.yearTres - rentabilidadSinRiesgo) / fund.volatilidadYearTres).toFixed(2);
        }
        return { ...fund, ratio3 };
      })),
      map((funds: any) => funds.map(fund => {
        let ratio1 = '0';
        const rentabilidadSinRiesgo = 3; // en porcentaje anual

        if (fund.yearUno && fund.volatilidadYearUno) {
          ratio1 = ((fund.yearUno - rentabilidadSinRiesgo) / fund.volatilidadYearUno).toFixed(2);
        }
        return { ...fund, ratio1 };
      })),
      map((funds: any) => funds.map(fund => {
        let ratioYtd = '0';
        const rentabilidadSinRiesgo = 2; // en porcentaje anual

        if (fund.ytd && fund.volatilidad) {
          ratioYtd = ((fund.ytd - rentabilidadSinRiesgo) / fund.volatilidad).toFixed(2);
        }
        return { ...fund, ratioYtd };
      })),
      map((funds: any) => funds.filter(fund => {
        return !fund.zonaGeografica.includes('India') &&
          !fund.zonaGeografica.includes('Europa') &&
          !fund.zonaGeografica.includes('Asia') &&
          !fund.zonaGeografica.includes('Japón') &&
          !fund.zonaGeografica.includes('España') &&
          !fund.nombre.toUpperCase().includes('INDUSTRIALS') &&
          !fund.nombre.toUpperCase().includes('HEALTHSCIENCE') &&
          !fund.nombre.toUpperCase().includes('TECHNOLOGY') &&
          !fund.nombre.toUpperCase().includes('INTELLIGENCE') &&
          !fund.nombre.toUpperCase().includes('ENERGY') &&
          !fund.nombre.toUpperCase().includes('EMERGING') &&
          !fund.nombre.toUpperCase().includes('INSURANCE') &&
          !fund.nombre.toUpperCase().includes('RUSSIA') &&
          !fund.nombre.toUpperCase().includes('GOLD') &&
          +fund.impMinPrimeraSubs.split(' ')[0] < 10000 &&

          fund.ter < 1.9 &&

          // CASI SIN PÉRDIDAS LOS ÚLTIMOS AÑOS
          // fund.rentabilidadPasadaCuatro > 0 &&
          // fund.rentabilidadPasadaTres > 0 &&
          // fund.rentabilidadPasadaDos > 0 &&
          // fund.rentabilidadPasadaUno > 0 &&
          // fund.ytd > 2

          // VOLATILIDAD ENTRE 2 y 5
          // fund.volatilidadYearTres < 5 && fund.volatilidadYearTres > 2 &&
          // fund.ytd > 4 // a finales de año
          // fund.ytd > 1.3 // a principios de año

          // VOLATILIDAD MENOR A 2
          // fund.volatilidadYearTres <= 2.1 &&
          // fund.ytd > 2
          // fund.ytd >= 1 // a principios de año


          // cuasi-monetarios ytd
          // fund.ytd > 2.5 && fund.ytd < 6 &&
          // fund.volatilidad < 1.5

          // cuasi-monetarios yearUno
          // fund.yearUno > 4 && fund.yearUno < 8 &&
          // fund.volatilidadYearUno < 1.1

          // RATIO ytd
          // fund.ytd >= 2 &&
          // fund.ratioYtd > 1.5

          // RATIO 1
          // fund.yearUno >= 5 &&
          // fund.ratio1 > 2.2

          // RATIO 3
          fund.yearTres > 5 &&
          fund.ratio3 > 1.2


        // rentabilidadPasadaCuatro -> 2020
        // rentabilidadPasadaDos -> 2022
      }))
    );
  }

  getCurrentRentabilidad(fund: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/fund/${fund}/trailing-returns`);
  }
}
