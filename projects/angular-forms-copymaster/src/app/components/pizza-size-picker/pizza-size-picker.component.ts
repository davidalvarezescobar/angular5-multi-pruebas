import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PizzaSizeEnum } from '../../containers/pizza-form-container/services/pizza-form.interface';
import { provideValueAccessor } from '../../containers/pizza-form-container/services/helpers';

@Component({
  selector: 'app-pizza-size-picker',
  templateUrl: './pizza-size-picker.component.html',
  styleUrls: ['./pizza-size-picker.component.scss'],
  providers: [
    provideValueAccessor(PizzaSizePickerComponent),
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => PizzaSizePickerComponent),
    //   multi: true
    // }
  ]
})
export class PizzaSizePickerComponent implements ControlValueAccessor {
  pizzaSize: PizzaSizeEnum;
  PizzaSizeEnum = PizzaSizeEnum;

  constructor() { }

  onModelChange = (value: PizzaSizeEnum) => {};

  changeSize(size: PizzaSizeEnum) {
    this.pizzaSize = size;
    this.onModelChange(size);
  }

  writeValue(value: PizzaSizeEnum) {
    this.pizzaSize = value;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched() {}
}
