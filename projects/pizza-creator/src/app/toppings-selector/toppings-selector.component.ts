import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Topping } from '../pizza.service';

@Component({
  selector: 'app-toppings-selector',
  templateUrl: './toppings-selector.component.html',
  styleUrls: ['./toppings-selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToppingsSelectorComponent implements OnInit {
  parent: FormGroup;

  @Input() toppings: Topping[]; // array con TODOS los toppings obtenidos desde Back
  @Input() selected: Topping[]; // array con los toppings SELECCIONADOS (los que se van añadiendo al FormArray)
  @Output() select = new EventEmitter<Topping>();

  constructor(
    readonly controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
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
