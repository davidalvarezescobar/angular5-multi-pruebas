import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Operation } from '../operation';
import { DecimalEspPipe } from '../../../shared/decimal-esp.pipe';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styles: [],
  providers: [
    DecimalEspPipe
  ]
})
export class NewComponent implements OnInit {
  @Input() numberOfOperations = 0;
  @Output() save = new EventEmitter();

  title = 'Cash Flow';
  kindsOfOperations = ['Income', 'Expense'];
  operation: Operation = new Operation();

  constructor(
    private decimalEspPipe: DecimalEspPipe
  ) { }

  ngOnInit() {
    // this.operation.amount = this.decimalEspPipe.transform( '0' );
  }

  saveOperation() {
    this.save.emit(this.operation);
    this.operation = new Operation();
  }

}
