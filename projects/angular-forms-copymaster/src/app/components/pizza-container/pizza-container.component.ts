import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PizzaFormService } from '../../services/pizza-form.service';

@Component({
  selector: 'app-pizza-container',
  templateUrl: './pizza-container.component.html',
  styleUrls: ['./pizza-container.component.scss']
})
export class PizzaContainerComponent implements OnInit {
  form: FormGroup = this.formService.form;

  constructor(
    private formService: PizzaFormService
  ) { }

  ngOnInit() {
  }

  submit(value){

  }

  reset() {}
}
