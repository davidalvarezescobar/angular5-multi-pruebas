import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, timer } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  name: string;
  registration: string;
  email: string;
  isPremium: boolean;
}


@Injectable()
export class AppService {
  // private users: IUser[];
  private _users$ = new Subject<IUser[]>();

  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<IUser[]> {
    this.simulateHttpGet<IUser[]>('../assets/mock/users.json').subscribe(users => {
      this.refresh(users);
    });
    return this._users$.asObservable();
  }

  refresh(data) {
    this._users$.next(data);
  }

  simulateHttpGet<T>(endPoint): Observable<T> {
    const delayed$ = timer(Math.random() * 4000).pipe(
      switchMap(x => {
        return this.http.get<T>(endPoint);
      })
    );
    return delayed$;
  }
}
