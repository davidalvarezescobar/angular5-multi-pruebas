import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from './hero-detail.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeroDetailComponent],
  exports: [HeroDetailComponent]
})
export class HeroDetailModule { }

// HeroDetailComponent se utiliza tanto como página state independiente, como componente que forma parte del state HeroesComponent
