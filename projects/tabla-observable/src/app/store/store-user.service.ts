import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpApiService, IUser } from './http-api.service';
import { StoreService } from './store.service';

const data = [
  {
      "name": "John Lilki",
      "registration": "September 14, 2013",
      "email": "jhlilk22@yahoo.com",
      "isPremium": true
  },
  {
      "name": "Jamie Harington",
      "registration": "January 11, 2014",
      "email": "jamieharingonton@yahoo.com",
      "isPremium": false
  },
  {
      "name": "Jill Lewis",
      "registration": "May 11, 2014",
      "email": "jilsewris22@yahoo.com",
      "isPremium": false
  }
];

@Injectable({
  providedIn: 'root'
})
export class StoreUserService extends StoreService<any> {

  constructor(
    readonly apiSrv: HttpApiService
  ) {
    super();
  }

  // en cada uno de los 'store' específicos, tendremos que implementar este método que es heredado del 'StoreService';
  // este método se encargará de realizar la llamada a back para obtener los datos del 'store';
  // podrá retornar un observable con los datos, o simplemente los datos (si ya los tenemos disponibles):
  loadStoreData(): Observable<IUser[]> | IUser[] {
    // return data;
    return this.apiSrv.fetchUsers().pipe(
      tap(_ => console.log('realizamos las modificaciones de datos oportunas mediante el operador "map()", no con este "tap()" que sólo sirve para este log...'))
    )
  }

  updatePremium(user: IUser) {
    // this.state.find(obj => { // en varias líneas
    //   return obj.name === user.name;
    // }).isPremium = !user.isPremium;
    this.state.find(obj => obj.name === user.name).isPremium = !user.isPremium; // en una sóla línea
  }

  addUser(user: IUser) {
    // this.state = this.state.push(user) ); // mutable
    this.state = [...this.state, user]; // inmutable
  }

  aproveAll() {
    // this._users$.value.map(user => { // en varias líneas
    //   return user.isPremium = true;
    // });
    this.state.map(user => user.isPremium = true); // en una sóla línea
  }
  
}
