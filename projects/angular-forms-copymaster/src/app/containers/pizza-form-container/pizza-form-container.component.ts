import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PizzaFormValidatorsService } from './services/pizza-form-validators.service';
import { IPizzaFormInterface } from './services/pizza-form.interface';
import { PizzaFormService } from './services/pizza-form.service';
import { PizzaLoaderService } from './services/pizza-loader.service';

@Component({
  selector: 'app-pizza-form-container',
  templateUrl: './pizza-form-container.component.html',
  styleUrls: [],
  providers: [
    PizzaFormService,
    PizzaFormValidatorsService,
    PizzaLoaderService
  ]
})
export class PizzaFormContainerComponent implements OnInit {
  editMode = false;
  get form(): FormGroup {
    return this.pizzaFormService.form;
  }

  get selectedPizza(): FormGroup | null {
    if (!this.pizzaFormService.pizzas.length) return null;

    // obtenemos la pizza sobre la que estamos trabajando (recuerda que la pizza es un FormGroup formado por 'size' y 'toppings'):
    return this.pizzaFormService.pizzas.at(this.pizzaFormService.selectedPizza) as FormGroup;
  }

  constructor(
    private pizzaLoaderService: PizzaLoaderService,
    private pizzaFormService: PizzaFormService
  ) { }

  ngOnInit() {
    if (this.editMode) {
      this.pizzaLoaderService.loadPizzaData();
    }
  }

  submit(data: IPizzaFormInterface) {
    if (!this.pizzaFormService.isValid()) {
      return;
    }

    const order: IPizzaFormInterface = this.pizzaFormService.createPizzaOrderDto(data);

    alert(`Thanks ${order.customerDetails.firstName}, the pizza is on the way!`);
  }

  reset() {
    this.pizzaFormService.resetForm();
  }

  onAddPizza() {
    this.pizzaFormService.addPizza();
  }

  onDeletePizza(index: number) {
    this.pizzaFormService.deletePizza(index);
  }

  onSelectPizza(index: number) {
    this.pizzaFormService.selectedPizza = index;
  }
}
