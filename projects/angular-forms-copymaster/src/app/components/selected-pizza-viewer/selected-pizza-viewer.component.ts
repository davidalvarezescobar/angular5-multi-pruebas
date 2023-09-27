import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-selected-pizza-viewer',
  templateUrl: './selected-pizza-viewer.component.html',
  styleUrls: ['./selected-pizza-viewer.component.scss']
})
export class SelectedPizzaViewerComponent implements OnInit {
  @Output() addPizza = new EventEmitter;
  selectedPizzaGroup;
  toppingsArray;

  constructor() { }

  ngOnInit(): void {
  }

}
