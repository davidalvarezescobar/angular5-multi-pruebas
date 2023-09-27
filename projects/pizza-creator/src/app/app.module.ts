import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PizzaService } from './pizza.service';
import { PizzaCreatorComponent } from './pizza-creator/pizza-creator.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { JoinPipe } from './pipes/join.pipe';
import { PizzaFormComponent } from './pizza-form/pizza-form.component';
import { ToppingsSelectorComponent } from './toppings-selector/toppings-selector.component';
import { PizzaNameComponent } from './pizza-name/pizza-name.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToppingsSelectedComponent } from './toppings-selected/toppings-selected.component';
import { PizzaButtonComponent } from './pizza-button/pizza-button.component';


@NgModule({
  declarations: [
    AppComponent,
    PizzaCreatorComponent,
    PizzaListComponent,
    JoinPipe,
    PizzaFormComponent,
    ToppingsSelectorComponent,
    PizzaNameComponent,
    ToppingsSelectedComponent,
    PizzaButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
