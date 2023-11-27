import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable, tap, timer } from 'rxjs';

export interface IUser {
  name: string;
  registration: string;
  email: string;
  isPremium: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(
    readonly http: HttpClient
  ) { }

  fetchUsers() {
    return this.simulateHttpGet<IUser[]>('../assets/mock/users.json').pipe(
      tap(_ => console.log('petición http...'))
    )
  }

  private simulateHttpGet<T>(endPoint): Observable<T> {
    const delayed$ = timer(Math.random() * 4000).pipe(
      concatMap(() => this.http.get<T>(endPoint))
    );
    return delayed$;
  }
}
