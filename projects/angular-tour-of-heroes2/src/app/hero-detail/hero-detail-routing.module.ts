import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailModule } from './hero-detail.module';

const routes: Routes = [
  {path: '', component: HeroDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeroDetailModule
  ],
  declarations: [],
  exports: []
})
export class HeroDetailRoutingModule { }

// Creamos las rutas en éste módulo de rutas (en lugar de hacerlo como siempre hago en el módulo del propio state),
// porque el componente HeroDetailComponent se va a utilizar:
// 1) como state independiente que se cargará mediante lazy load (desde el state DashBoard, clicando sobre cualquier heroe),
// 2) y como componente normal, dentro del state HeroesComponent.

// Puesto que un componente debe declararse en un sólo módulo, lo declaro en el HeroDetailModule y además lo exporto.
// De este modo:
// 1) Cuando se cargue el state HeroDetailComponent mediante lazy load:
//    AppRoutingModule -> HeroDetailRoutingModule -> HeroDetailModule -> HeroDetailComponent
// 2) Cuando se cargue el state HeroesComponent, el cual utiliza el componente HeroDetailComponent:
//    AppRoutingModule -> HeroesModule -> HeroDetailModule -> HeroDetailComponent

