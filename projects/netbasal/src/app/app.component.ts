import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  customCheck = new FormControl(true);
  textoEditable = new FormControl('borrame');


  options = [
    {label: 'hola', value: 1},
    {label: 'bueno', value: 2},
    {label: 'adios', value: 3}
  ];
  selected = 'adios';


  constructor() {
  }


  ngOnInit() {
  }

}
