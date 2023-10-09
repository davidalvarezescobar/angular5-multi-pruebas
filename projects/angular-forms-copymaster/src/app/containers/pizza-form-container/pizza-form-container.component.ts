import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PizzaFormValidatorsService } from './services/pizza-form-validators.service';
import { IPizzaFormInterface } from './services/pizza-form.interface';
import { PizzaFormService } from './services/pizza-form.service';
import { PizzaLoaderService } from './services/pizza-loader.service';

@Component({
  selector: 'app-pizza-form-container',
  templateUrl: './pizza-form-container.component.html',
  styleUrls: ['./pizza-form-container.component.scss'],
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

  get selectedPizzaGroup(): FormGroup | null {
    if (!this.pizzaFormService.pizzas.length) return null;

    return this.pizzaFormService.pizzas.at(this.form.get('selectedPizza').value) as FormGroup;
  }

  constructor(
    private pizzaLoaderService: PizzaLoaderService,
    private pizzaFormService: PizzaFormService
  ) { }

  ngOnInit() {
    // here you can check the page url if a pizza order id was specified
    // and load it from the server
    if (this.editMode) {
      this.pizzaLoaderService.loadPizzaData();
    }
  }

  onAddPizza() {
    this.pizzaFormService.addPizza();
    this.pizzaFormService.setCurrentPizza();
  }

  async submit(data: IPizzaFormInterface) {
    if (!this.pizzaFormService.isValid) {
      return;
    }

    const order: IPizzaFormInterface = this.pizzaFormService.createPizzaOrderDto(data);

    alert(`Thanks ${order.customerDetails.firstName}, the pizza is on the way!`);

    if (this.editMode) {
      // update api endpoint call
    } else {
      // create api endpoint call
    }
  }

  reset() {
    this.pizzaFormService.resetForm();
  }

  onDeletePizza(index: number) {
    this.pizzaFormService.deletePizza(index);
  }

  onSelectPizza(index: number) {
    this.pizzaFormService.setCurrentPizza(index);
  }
}
