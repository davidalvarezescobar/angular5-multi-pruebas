import { Component, OnInit } from '@angular/core';
import { Operation } from './operation';
import { OperationsService } from './operations.service';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-operations',
  template: `
    <ng-container *ngIf="(operations$ | async) as operations">
      <app-new [numberOfOperations]="operations.length" (save)="saveOperation($event)">
      </app-new>
      <app-list [numberOfOperations]="operations.length" [operations]="operations" (delete)="deleteOperation($event)">
      </app-list>
    </ng-container>
  `,
  styles: []
})
export class OperationsComponent implements OnInit {
  operations$: Observable<Operation[]>;

  constructor(private operationsService: OperationsService) {
  }

  ngOnInit() {
    this.operations$ = this.operationsService.getOperationsList();
  }

  saveOperation(operation) {
    this.operationsService.saveOperation(operation);
  }

  deleteOperation(operation) {
    this.operationsService.deleteOperation(operation);
  }

}
