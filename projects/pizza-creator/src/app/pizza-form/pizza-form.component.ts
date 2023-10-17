import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Topping } from '../pizza.service';
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

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      name: this._fb.control('', { validators: Validators.required, nonNullable: true }),
      toppings: this._fb.array([], Validators.required)
    },
      {
        validators: PizzaValidator
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

  addTopping(topping) {
    this.selectedToppings.push(new FormControl(topping));
  }

  onSubmit() {
    this.form['submitted'] = true;  // apaño para realizar las validaciones sólo cuando hacemos submit
    console.log('Datos FORM on Submit:', this.form);

    if (this.form.valid) {
      this.add.emit(this.form.value);
      this.form['submitted'] = false;
      // Borramos el todo el contenido del formArray.
      // Con 'this.form.reset()' vaciaríamos cada uno de los formControl que hubiera en el array,
      // pero el array seguiría teniendo el mismo número de elementos.
      this.selectedToppings.clear();
      // borramos el contenido del formControl 'name'
      this.form.reset();
    }
  }
}
