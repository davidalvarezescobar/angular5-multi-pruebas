import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio-group-by',
  templateUrl: './ejercicio-group-by.component.html',
  styleUrls: []
})
export class EjercicioGroupByComponent {
  // el ejercicio está aquí:
  // https://ramya-bala221190.medium.com/angular-grouping-data-based-on-single-and-multiple-keys-using-rxjs-e0bc0461bcc9

  numbers = [
    { type: 'odd', value: 1 },
    { type: 'odd', value: 3 },
    { type: 'odd', value: 5 },
    { type: 'even', value: 2 },
    { type: 'even', value: 6 },
    { type: 'odd', value: 7 },
    { type: 'even', value: 8 },
    { type: 'odd', value: 9 },
    { type: 'even', value: 10 },
    { type: 'odd', value: 11 },
    { type: 'even', value: 12 },
    ];

}
