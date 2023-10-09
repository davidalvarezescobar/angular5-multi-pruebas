import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selected-pizza-viewer',
  templateUrl: './selected-pizza-viewer.component.html',
  styleUrls: ['./selected-pizza-viewer.component.scss']
})
export class SelectedPizzaViewerComponent {
  @Input() selectedPizzaGroup: FormGroup;
  @Output() addPizza = new EventEmitter();

  get toppingsArray(): FormGroup[] | [] {
    if (!this.selectedPizzaGroup) return [];

    return (this.selectedPizzaGroup.get('toppings') as FormArray).controls as FormGroup[];
  }

  getFormControl(group: FormGroup, ctrlName: string): FormControl {
    return group.get(ctrlName) as FormControl;
  }

}
