import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroDetailModule } from '../hero-detail/hero-detail.module';

const routes: Routes = [
  {path: '', component: HeroesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeroDetailModule
  ],
  declarations: [HeroesComponent],
  exports: []
})
export class HeroesModule { }

// importamos HeroDetailModule, para tener acceso al componente HeroDetailComponent que exporta