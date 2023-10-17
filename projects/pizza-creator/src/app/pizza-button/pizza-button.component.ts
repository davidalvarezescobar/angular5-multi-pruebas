import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-button',
  templateUrl: './pizza-button.component.html',
  styleUrls: ['./pizza-button.component.less']
})
export class PizzaButtonComponent implements OnInit {
  parent: FormGroup;

  constructor(
    readonly controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
  }

}
