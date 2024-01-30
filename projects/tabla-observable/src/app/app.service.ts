import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export interface IUser {
  name: string;
  registration: string;
  email: string;
  isPremium: boolean;
}

// OJO!!!!
// CLASE QUE HE DEPRECADO, TODA LA FUNCIONALIDAD DE ESTA CLASE SE ENCUENTA AHORA EN LA CARPETA 'STORE'
@Injectable()
export class AppService {
  private _users$ = new BehaviorSubject(undefined);
  readonly users$ = this._users$.asObservable();

  private get users() {
    return this._users$.value;
  }

  private set users(data) {
    this._users$.next(data);
  }


  constructor(
    private http: HttpClient
  ) { }


  getUsers(): Observable<IUser[]> {
    // this.simulateHttpGet<IUser[]>('../assets/mock/users.json').subscribe(users => this.users = users); // sin cachear la petición http
    this.requestUsers().subscribe(users => this.users = users); // cacheando la petición htpp

    return this.users$;
  }

  updatePremium(user: IUser) {
    // this.users.find(obj => { // en varias líneas
    //   return obj.name === user.name;
    // }).isPremium = !user.isPremium;
    this.users.find(obj => obj.name === user.name).isPremium = !user.isPremium; // en una sóla línea
  }

  addUser(user: IUser) {
    // this.users = this.users.push(user) ); // mutable
    this.users = [...this.users, user]; // inmutable
  }

  aproveAll() {
    // this._users$.value.map(user => { // en varias líneas
    //   return user.isPremium = true;
    // });
    this.users.map(user => user.isPremium = true); // en una sóla línea
  }


  // tslint:disable-next-line:member-ordering
  private requestUsers$: Observable<IUser[]>;
  private requestUsers() {
    if (!this.requestUsers$) {
      this.requestUsers$ = this.simulateHttpGet<IUser[]>('../assets/mock/users.json').pipe(
        tap(_ => console.log('nueva petición...')),
        tap(_ => console.log('realizamos las modificaciones de datos oportunas...')),
        shareReplay()
      );
    }
    return this.requestUsers$;
  }


  private simulateHttpGet<T>(endPoint): Observable<T> {
    const delayed$ = timer(Math.random() * 4000).pipe(
      switchMap(x => {
        return this.http.get<T>(endPoint);
      })
    );
    return delayed$;
  }

}
