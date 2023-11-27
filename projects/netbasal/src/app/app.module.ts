import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CustomCheckboxComponentComponent } from './the-power-of-selectors/custom-checkbox-component.component';
import { CustomCheckboxDirectiveDirective } from './the-power-of-selectors/custom-checkbox-directive.directive';
import { TextareaExpandedComponent } from './custom-form-controls-made-easy/textarea-expanded.component';
import { TooltipComponent } from './create-advanced-components/tooltip.component';
import { TooltipDirective } from './create-advanced-components/tooltip.directive';
import { SelectComponent } from './create-powerful-action-menu/select.component';
import { FileUploadingComponent } from './file-uploading/file-uploading.component';
import { FileUploadComponent } from './file-uploading/file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './manage-your-filters-like-a-pro/filters/filters.component';
import { App4Component } from './manage-your-filters-like-a-pro/app-4.component';
import { ListComponent } from './template-outlet/list/list.component';
import { RowComponent } from './template-outlet/row/row.component';
import { CardComponent } from './template-outlet/card/card.component';
import { TemplateOutletComponent } from './template-outlet/template-outlet.component';
import { NweInputComponent } from './template-outlet/nwe-input/nwe-input.component';
import { ContextMenuAppComponent } from './context-menu/context-menu-app/context-menu-app.component';
import { ContextMenuComponent } from './context-menu/context-menu/context-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomCheckboxComponentComponent,
    CustomCheckboxDirectiveDirective,
    TextareaExpandedComponent,
    TooltipComponent,
    TooltipDirective,
    SelectComponent,
    FileUploadingComponent,
    FileUploadComponent,
    App4Component,
    FiltersComponent,
    ListComponent,
    RowComponent,
    CardComponent,
    TemplateOutletComponent,
    NweInputComponent,
    ContextMenuAppComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    TooltipComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
