import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerDetails: FormGroup;

  constructor(
    readonly controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.customerDetails = this.controlContainer.control.get('customerDetails') as FormGroup;
  }

}
