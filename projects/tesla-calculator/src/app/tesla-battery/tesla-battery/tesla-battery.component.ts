import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tesla-battery',
  templateUrl: './tesla-battery.component.html',
  styleUrls: ['./tesla-battery.component.less']
})
export class TeslaBatteryComponent implements OnInit {
  title = 'Alcance por carga';
  form: FormGroup = this.fb.group({
    config: this.fb.group({
      speed: 55,
      temperature: 20,
      climate: true,
      wheels: 19
    })
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

  }

}
