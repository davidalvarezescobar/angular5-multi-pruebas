import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selected-pizza-viewer',
  templateUrl: './selected-pizza-viewer.component.html',
  styleUrls: ['./selected-pizza-viewer.component.scss']
})
export class SelectedPizzaViewerComponent {
  @Input() selectedPizza: FormGroup;
  @Output() addPizza = new EventEmitter();

  get toppingsArray(): FormGroup[] | [] {
    if (!this.selectedPizza) return [];

    return (this.selectedPizza.get('toppings') as FormArray).controls as FormGroup[];
  }

  // SÓLO se utiliza si elegimos la OPCIÓN 1 de la template HTML:
  // getFormControl(group: FormGroup, ctrlName: string): FormControl {
  //   return group.get(ctrlName) as FormControl;
  // }

}
