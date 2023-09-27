import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class PreloaderService {
  private subject = new Subject();
  public observable$ = this.subject.asObservable();

  constructor() {
    // this.showLoader();
  }

  showLoader() {
    document.querySelector('.preloader')['style'].display = 'block';
    // this.subject.next(true);
  }

  hideLoader() {
    document.querySelector('.preloader')['style'].display = 'none';
    // this.subject.next(false);
  }
}
