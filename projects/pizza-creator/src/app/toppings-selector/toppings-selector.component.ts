import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Topping } from '../pizza.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toppings-selector',
  templateUrl: './toppings-selector.component.html',
  styleUrls: ['./toppings-selector.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToppingsSelectorComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() toppings: Topping[]; // array con todos los toppings
  @Input() selected: Topping[]; // array con los toppings seleccionados
  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(topping) {
    this.select.emit(topping);
  }

  isActive(topping) {
    return this.selected.includes(topping); // con includes
 // return !!~this.selected.indexOf(topping); // con indexOf
  }

  get invalid() {
    // Hago uso del validador 'noToppings' a nivel del raiz del form,
    // en lugar del validador en el formControl 'toppings':
    return this.parent.hasError('noToppings');
  }
}
