import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Topping } from '../pizza.interface';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { PizzaValidator } from '../pizza.validator';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaFormComponent implements OnInit {
  @Input() toppings: Topping[];
  @Output() add = new EventEmitter();

  form: FormGroup;
  private _selectedToppings: FormArray;

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      toppings: this._fb.array([], Validators.required)
    },
    {
      validator: PizzaValidator
    });
  }

  get selectedToppings() {
    return this.form.get('toppings') as FormArray;
  }

  onSelectTopping(topping) {
    const index = this.selectedToppings.value.indexOf(topping); // dentro de un objeto 'formArray', los datos van en la propiedad 'value'
    if (!!~index) { // si es true, o sea, si existe: lo quitamos
      this.removeTopping(index);
    } else { // si es false, o sea, si no existe: lo añadimos
      this.addTopping(topping);
    }
  }

  removeTopping(index) {
    this.selectedToppings.removeAt(index);
  }

  private addTopping(topping) {
    this.selectedToppings.push(new FormControl(topping));
  }

  onSubmit() {
    this.form['submitted'] = true;  // apaño para realizar las validaciones sólo cuando hacemos submit
    console.log('Datos FORM:', this.form);

    if (this.form.valid) {
      this.add.emit(this.form.value);
      this.form['submitted'] = false;
      // Borramos el todo el contenido del formArray.
      // Con 'this.form.reset()' vaciaríamos cada uno de los formControl que hubiera en el array,
      // pero el array seguiría teniendo el mismo número de elementos.
      const tamToppingsArray = this.selectedToppings.length;
      for (let index=tamToppingsArray-1; index >= 0; index-- ) {
        this.selectedToppings.removeAt(index);
      }
      // borramos el contenido del formControl 'name'
      this.form.reset();
    }
  }
}
