import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class PreloaderService {
  private _subject$ = new BehaviorSubject<boolean>(false);
  public readonly observable$ = this._subject$.asObservable().pipe(distinctUntilChanged());
  private requests: HttpRequest<any>[] = [];

  constructor() { }

  showLoader(request: HttpRequest<any>) {
    this.requests.push(request);
    this._subject$.next(true);
    console.log(this.requests);
  }

  hideLoader(request: HttpRequest<any>) {
    const index = this.requests.indexOf(request);
    if (index !== -1) {
      this.requests.splice(index, 1);
      if (this.requests.length === 0) {
        this._subject$.next(false);
      }
    }
  }

  forceHideLoader() {
    this._subject$.next(false);
  }
}
