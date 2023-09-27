import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FaInputComponent } from './fa-input/fa-input.component';
import { FaInputBetterComponent } from './fa-input-better/fa-input-better.component';
import { InputHandlerDirective } from './fa-input-better/input-handler.directive';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  // Como el componente HomeComponent hace uso a su vez de otros componentes,
  // lo centralizamos todo en éste módulo.
  // Así el app.module sólo tendrá que importar éste módulo, en lugar de los componentes
  declarations: [
    HomeComponent,
    FaInputComponent,
    FaInputBetterComponent,
    InputHandlerDirective
  ]
})
export class HomeModule { }
