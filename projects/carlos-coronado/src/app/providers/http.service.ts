import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import mocks from '../../assets/mock.json';


@Injectable()
export class HttpService {
  listadoPlanes$: Observable<any>;
  combosEvento$: Observable<any>;

  constructor(private http: HttpClient) { }

  getListadoEventos(searchDesc?) {
    const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/event/list';
    const params = {
      'searchReference': '01',
      'requestedListSize': '50',
      'eventDescription': searchDesc
    };
    const request$ = this.http.post(url, params).pipe(
      timeout(3000),
      catchError(() => of(mocks).pipe(
        map((res: any) => {
          if (!searchDesc) {
            return res;
          }
          const filtered = res.eventlistItem.filter(r => r.eventDescription.includes(searchDesc));
          return { eventlistItem: filtered };
        })))
    );
    return request$.pipe(
      map((res: any) => res?.eventlistItem),
      // a continuación, un map de rxjs, más un map de javascript que itera con la lista de datos
      map((list: any[]) => list.map(o => {
        return {id: 'prueba', ...o};
      }))
    );
  }

  getListadoPlanes() {
    if (!this.listadoPlanes$) {
      const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/plan/list';
      const params = {
        'searchReference': '01',
        'requestedListSize': '50',
        'planDescription': null
      };
      this.listadoPlanes$ = this.http.post(url, params).pipe(
        map((res: any) => res?.planlistItem),
        shareReplay()
      );
    }
    return this.listadoPlanes$;
  }

  getCombosEvento() {
    if (!this.combosEvento$) {
      const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/masterlist';
      const params = {
        comboList: ['MO', 'PR', 'TIE', 'CLE']
      };
      this.combosEvento$ = this.http.post(url, params).pipe(
        map((res: any) => res?.comboListResult),
        map((arr: any[]) => {
          console.log('Array original:', arr);
          const newResult = {};
          for (const {comboCode, comboListData} of arr) {
            newResult[comboCode] = comboListData;
          }
          console.log('Array convertido a objeto:', newResult);
          return newResult;
        }),
        shareReplay()
      );
    }
    return this.combosEvento$;
  }

  clearCache() {
    this.listadoPlanes$ = null;
    this.combosEvento$ = null;
  }

  nuevoEvento(evento) {
    const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/event/new';
    return this.http.post(url, evento);
  }
}
