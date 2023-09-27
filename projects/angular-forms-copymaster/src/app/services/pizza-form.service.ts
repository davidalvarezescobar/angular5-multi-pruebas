import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PizzaValidatorService } from './pizza-validator.service';


@Injectable()
export class PizzaFormService {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pizzaValidatorService: PizzaValidatorService
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      selectedPizza: null,
      pizzas: this.fb.array([]),
      customerDetails: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: this.fb.group({
          street: [null, Validators.required],
          houseNum: [null, Validators.required],
          city: [null, Validators.required],
          floor: [null, Validators.required],
        })
      })
    }, {
      validator: this.pizzaValidatorService.formValidator()
    });

  }
}
