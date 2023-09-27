import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from '../../app.model';


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  @Input() pizzas: Pizza[];

  constructor() { }

  ngOnInit() {
  }

}
