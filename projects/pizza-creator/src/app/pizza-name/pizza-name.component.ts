import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pizza-name',
  templateUrl: './pizza-name.component.html',
  styleUrls: ['./pizza-name.component.less']
})
export class PizzaNameComponent implements OnInit {
  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() { }

  get required() {
    return this.parent.get('name').hasError('required') && this.parent['submitted'];
  }

}
