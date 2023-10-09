import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PizzaFormContainerComponent } from './containers/pizza-form-container/pizza-form-container.component';
import { SelectedPizzaViewerComponent } from './components/selected-pizza-viewer/selected-pizza-viewer.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { PizzaSizePickerComponent } from './components/pizza-size-picker/pizza-size-picker.component';


export const APP_MODULE_DECLARATIONS = [
  AppComponent,
  PizzaFormContainerComponent,
  SelectedPizzaViewerComponent,
  PizzaListComponent,
  CustomerDetailsComponent,
  PizzaSizePickerComponent
];

export const APP_MODULE_IMPORTS = [
  ReactiveFormsModule,
  FormsModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  BrowserModule,
  BrowserAnimationsModule
];
