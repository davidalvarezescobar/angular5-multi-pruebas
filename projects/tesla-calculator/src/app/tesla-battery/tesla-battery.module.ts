import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TeslaBatteryService } from './tesla-battery.service';
import { TeslaBatteryComponent } from './tesla-battery/tesla-battery.component';
import { TeslaCarComponent } from '../components/tesla-car/tesla-car.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    TeslaBatteryComponent,
    TeslaCarComponent
  ],
  providers: [
    TeslaBatteryService
  ],
  exports: [
    TeslaBatteryComponent
  ]
})
export class TeslaBatteryModule { }
