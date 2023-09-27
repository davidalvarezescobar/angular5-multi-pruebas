import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-button',
  templateUrl: './pizza-button.component.html',
  styleUrls: ['./pizza-button.component.less']
})
export class PizzaButtonComponent implements OnInit {
  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() { }

}
