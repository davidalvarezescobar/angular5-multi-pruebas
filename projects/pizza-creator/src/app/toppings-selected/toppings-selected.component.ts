import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Topping } from '../pizza.service';

@Component({
  selector: 'app-toppings-selected',
  templateUrl: './toppings-selected.component.html',
  styleUrls: ['./toppings-selected.component.less']
})
export class ToppingsSelectedComponent implements OnInit {
  parent: FormGroup;
  
  @Input() selected: Topping[];
  @Output() remove = new EventEmitter();

  constructor(
    readonly controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
  }

}
