import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from '../pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  @Input() pizzas: Pizza[];

  constructor() { }

  ngOnInit() { }

}
