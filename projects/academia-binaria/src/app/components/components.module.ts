import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavComponent, FooterComponent],
  exports: [NavComponent, FooterComponent]
})
export class ComponentsModule { }
