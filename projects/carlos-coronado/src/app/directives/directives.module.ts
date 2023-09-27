import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandleErrorsDirective } from './control-errores.directive';
import { OutlineBorderDirective } from './outline-border.directive';
import { TooltipDirective } from './tooltip.directive';
import { ScrollableDirective } from './scrollable.directive';
import { SubmitEmitterDirective } from './submit-emitter.directive';
import { ValidationService } from '../providers/validation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HandleErrorsDirective,
    OutlineBorderDirective,
    TooltipDirective,
    ScrollableDirective,
    SubmitEmitterDirective
  ],
  exports: [
    HandleErrorsDirective,
    OutlineBorderDirective,
    TooltipDirective,
    ScrollableDirective,
    SubmitEmitterDirective
  ],
  providers: [
    ValidationService
  ]
})
export class DirectivesModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: DirectivesModule,
  //     providers: [aquí pondríamos los servicios a compartir]
  //   };
  // }
}
