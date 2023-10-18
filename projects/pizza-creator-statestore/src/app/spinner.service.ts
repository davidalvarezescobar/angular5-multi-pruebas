import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, distinctUntilChanged, filter, finalize, map, MonoTypeOperatorFunction, Observable, tap } from 'rxjs';

export interface RequestState {
  [key: string]: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private readonly requestState = new BehaviorSubject<RequestState>({});

  /**
   * Updates request state
   * param requestState: newRequestState
   */
  private updateState(newRequestState: RequestState) {
    const currentState = this.requestState.value;
    this.requestState.next({ ...currentState, ...newRequestState });
  }

  /**
   * Gets request state
   * param requestName: string
   * returns Observable<boolean>
   */
  public getState(requestName: string): Observable<boolean> {
    return this.requestState.asObservable().pipe(
      map(state => state?.[requestName]),
      filter(state => state !== undefined),
      distinctUntilChanged()
    );
  }

  public handleSpinner<T>(requestName: string): MonoTypeOperatorFunction<T> {
    return source => defer(() => {
      this.updateState({ [requestName]: true });
  
      return source.pipe(
        finalize(() => {
          this.updateState({ [requestName]: false });
        })
      );
    });
  }
}
