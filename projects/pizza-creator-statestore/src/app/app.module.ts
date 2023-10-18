import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerDirective } from './directives/spinner.directive';


@NgModule({
  declarations: [
    AppComponent,
    PizzaFormComponent,
    PizzaListComponent,
    SpinnerDirective,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
