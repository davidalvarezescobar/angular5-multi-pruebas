import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor(public sessionStorageKey: string) { }

  set(data) {
    sessionStorage.setItem(`${this.sessionStorageKey}`, JSON.stringify(data));
  }

  get() {
    const item = sessionStorage.getItem(this.sessionStorageKey);
    if (item) {
      return JSON.parse(item);
    }
  }

}
