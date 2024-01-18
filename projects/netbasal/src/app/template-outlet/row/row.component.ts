import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styles: [`
    :host {
      display: block;
      background: aliceblue;
    }
  `]
})
export class RowComponent {
  @Input() rowData;
  @Output() select = new EventEmitter();

}
