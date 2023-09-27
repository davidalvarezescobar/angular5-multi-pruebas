import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tesla-car',
  templateUrl: './tesla-car.component.html',
  styleUrls: ['./tesla-car.component.less']
})
export class TeslaCarComponent implements OnInit {
  @Input() wheelsize;

  constructor() { }

  ngOnInit() {
  }

}
