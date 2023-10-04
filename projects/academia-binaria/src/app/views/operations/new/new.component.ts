import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalEspPipe } from '../../../shared/decimal-esp.pipe';
import { Operation } from '../operation';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styles: [],
  providers: [
    DecimalEspPipe
  ]
})
export class NewComponent {
  @Input() numberOfOperations = 0;
  @Output() save = new EventEmitter();

  title = 'Componente "app-new":';
  kindsOfOperations = ['Income', 'Expense'];
  operation: Operation = new Operation();

  constructor() { }

  saveOperation() {
    this.save.emit(this.operation);
    this.operation = new Operation();
  }

}
