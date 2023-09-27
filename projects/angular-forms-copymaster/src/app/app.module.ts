import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaContainerComponent } from './components/pizza-container/pizza-container.component';
import { PizzaValidatorService } from './services/pizza-validator.service';
import { PizzaFormService } from './services/pizza-form.service';
import { SelectedPizzaViewerComponent } from './components/selected-pizza-viewer/selected-pizza-viewer.component';
import { PizzaSizePickerComponent } from './components/pizza-size-picker/pizza-size-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    PizzaContainerComponent,
    SelectedPizzaViewerComponent,
    PizzaSizePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    PizzaValidatorService,
    PizzaFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
