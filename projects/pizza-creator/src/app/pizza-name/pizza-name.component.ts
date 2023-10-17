import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-name',
  templateUrl: './pizza-name.component.html',
  styleUrls: ['./pizza-name.component.less']
})
export class PizzaNameComponent implements OnInit {
  parent: FormGroup;

  constructor(
    readonly controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
  }

  get required() {
    return this.parent.get('name').hasError('required') && this.parent['submitted'];
  }

}
