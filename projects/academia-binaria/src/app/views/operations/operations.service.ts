import { Injectable } from '@angular/core';
import { Operation } from './operation';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class OperationsService {
  private operations$ = new BehaviorSubject<Operation[]>([]);

  constructor() { }


  getOperationsList() {
    return this.operations$.asObservable().pipe(
      tap((val) => console.log(val))
    );
  }

  getOperationById(id) {
    return this.operations$.value.find(o => o._id === id);
  }

  saveOperation(operation) {
    operation._id = new Date().getTime().toString();
    console.log('id:', operation._id);
    this.operations$.value.push(operation);
    this.refresh();
  }

  deleteOperation(operation) {
    const index = this.operations$.value.indexOf(operation);
    this.operations$.value.splice(index, 1);
    this.refresh();
  }

  refresh() {
    this.operations$.next(this.operations$.value);
  }
}
