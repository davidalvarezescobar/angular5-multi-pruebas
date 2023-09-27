import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventosAltaComponent } from './eventos-alta.component';
import { PipesModule } from '../../pipes/pipes.module';
import { DatosGeneralesComponent } from '../../components/datos-generales/datos-generales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { SharedComponentsModule } from '../../components/shared-components.module';

const routes: Routes = [
  {path: '', component: EventosAltaComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
    ReactiveFormsModule,
    DirectivesModule,
    SharedComponentsModule
  ],
  declarations: [
    EventosAltaComponent,
    DatosGeneralesComponent
  ]
})
export class EventosAltaModule { }
