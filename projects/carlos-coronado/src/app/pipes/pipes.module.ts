import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderByPipe],
  exports: [OrderByPipe]
})
export class PipesModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: PipesModule,
  //     providers: [aquí pondríamos los servicios a compartir]
  //   };
  // }
}
