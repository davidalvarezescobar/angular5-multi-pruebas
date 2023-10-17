import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';


// Éste validador es redundante, porque en pizza-form.component ya he puesto
// el validador 'required' en form.toppings --> this._fb.array([], Validators.required)
// Lo pongo para comprobar que tambien se pueden realizar validaciones a nivel del raiz 'form'
export const PizzaValidator = (control: FormGroup): ValidationErrors | null => {
    // 'control' es el formGroup donde se ha injectado este validador (en este caso, es el this.form)
    const toppings = (control.get('toppings') as FormArray).value;
    return toppings.length ? null : { noToppings: true };
};
