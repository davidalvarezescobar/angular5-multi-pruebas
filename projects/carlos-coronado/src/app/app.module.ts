import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { PlanesComponent } from './views/planes/planes.component';
import { AccionesComponent } from './views/acciones/acciones.component';
import { HttpService } from './providers/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloaderService } from './providers/preloader.service';
import { Interceptor } from './interceptor';
import { PipesModule } from './pipes/pipes.module';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FaInputComponent } from './components/fa-input/fa-input.component';
import { DirectivesModule } from './directives/directives.module';
import { SharedComponentsModule } from './components/shared-components.module';


const routes: Routes = [
  {path: 'eventos', component: EventosComponent},
  {path: 'planes', component: PlanesComponent},
  {path: 'acciones', component: AccionesComponent},
  {path: 'alta-eventos', loadChildren: () => import('./views/eventos-alta/eventos-alta.module').then(m => m.EventosAltaModule)},
  {path: '', pathMatch: 'full', redirectTo: 'eventos' }
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EventosComponent,
    PlanesComponent,
    AccionesComponent,
    BuscadorComponent,
    FaInputComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    // PipesModule.forRoot() // sólo si PipesModule compartiera servicios
    PipesModule,
    // DirectivesModule.forRoot() // sólo si DirectivesModule compartiera servicios
    DirectivesModule,
    SharedComponentsModule
  ],
  providers: [
    HttpService,
    PreloaderService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
