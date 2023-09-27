import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatearImporteDirective } from './formatear-importe.directive';
import { MascaraImportePipe } from './mascara-importe.pipe';
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DecimalEspPipe } from './decimal-esp.pipe';

registerLocaleData(es);


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormatearImporteDirective,
    MascaraImportePipe,
    DecimalEspPipe
  ],
  exports: [
    FormatearImporteDirective,
    MascaraImportePipe
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }]
})
export class SharedModule { }
