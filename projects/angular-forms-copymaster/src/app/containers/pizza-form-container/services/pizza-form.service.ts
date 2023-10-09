import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaFormValidatorsService } from './pizza-form-validators.service';
import { IPizzaFormInterface, IToppingItem, PizzaSizeEnum, PizzaToppingsEnum } from './pizza-form.interface';

@Injectable()
export class PizzaFormService {
  public form: FormGroup;

  constructor(
    private pizzaValidatorsService: PizzaFormValidatorsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      selectedPizza: null,
      pizzas: this.fb.array([]),
      customerDetails: this.fb.group({
        firstName: ['', { validators: Validators.required, initialValueIsDefault: true }],
        lastName: ['', { validators: Validators.required, initialValueIsDefault: true }],
        phoneNumber: ['', { validators: Validators.required, initialValueIsDefault: true }],
        address: this.fb.group({
          street: ['', { validators: Validators.required, initialValueIsDefault: true }],
          houseNum: ['', { validators: Validators.required, initialValueIsDefault: true }],
          city: ['', { validators: Validators.required, initialValueIsDefault: true }]
        })
      })
    }, {
      validator: this.pizzaValidatorsService.formValidator()
    });
  }

  get pizzas(): FormArray {
    return this.form.get('pizzas') as FormArray;
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.pizzaValidatorsService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }

  get currentPizza(): number {
    return this.form.get('selectedPizza').value;
  }

  addPizza(): FormGroup {
    const pizzaGroup = this.createPizzaGroup();
    this.pizzas.push(pizzaGroup);

    this.form.markAsDirty();

    return pizzaGroup;
  }

  setCurrentPizza(index: number = this.pizzas.length - 1) {
    this.form.get('selectedPizza').setValue(index);
  }

  createPizzaGroup(size: PizzaSizeEnum = PizzaSizeEnum.MEDIUM): FormGroup {
    return this.fb.group({
      size,
      toppings: this.createToppingsArray()
    }, {
      validator: this.pizzaValidatorsService.maxToppingsValidator()
    });
  }

  deletePizza(index: number): void {
    this.pizzas.removeAt(index);
    const currentPizza = this.currentPizza > 0 ? this.currentPizza-1 : null;
    this.setCurrentPizza(currentPizza);
    this.form.markAsDirty();
  }

  createPizzaOrderDto(data: IPizzaFormInterface): IPizzaFormInterface {
    const order = {
      customerDetails: data.customerDetails,
      pizzas: data.pizzas
    };

    for (const pizza of order.pizzas) {
      pizza.toppings = this.getSelectedToppings(pizza.toppings as IToppingItem[])
        .map((i) => {
          return i.name;
        });
    }

    return order;
  }

  getSelectedToppings(toppings: IToppingItem[]): IToppingItem[] {
    return toppings.filter(i => i.selected);
  }

  resetForm() {
    while (this.pizzas.length) {
      this.pizzas.removeAt(0);
    }

    this.form.reset();
  }

  private createToppingsArray(): FormArray {
    const availableToppings = [...Object.values(PizzaToppingsEnum)];
    // retorna un formArray que contiene entidades (formGroups compuestos de 2 formControl cada uno):
    return this.fb.array(availableToppings.map((i) => {
      return this.fb.group({
        name: i,
        selected: false
      });
    }));
  }
}
