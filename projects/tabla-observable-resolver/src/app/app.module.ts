import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HnResolver } from './app.resolver';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { EjercicioGroupByComponent } from './components/ejercicio-group-by/ejercicio-group-by.component';
import { GroupPipe } from './components/ejercicio-group-by/group.pipe';

const routes: Routes = [
  { path: 'tabla', component: TableComponent, resolve: { users: HnResolver } },
  { path: '**', redirectTo: 'tabla' }
];


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    UserListComponent,
    EjercicioGroupByComponent,
    GroupPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    HnResolver,
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
