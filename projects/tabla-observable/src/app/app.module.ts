import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppService } from './app.service';
import { ModalComponent } from './modal/modal.component';
import { AddUserComponent } from './add-user/add-user.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'tabla', component: AppComponent },
  { path: '**', redirectTo: 'tabla' }
];


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ModalComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
