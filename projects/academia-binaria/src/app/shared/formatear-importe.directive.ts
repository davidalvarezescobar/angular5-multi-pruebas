import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { DecimalEspPipe } from './decimal-esp.pipe';
import { MascaraImportePipe } from './mascara-importe.pipe';

@Directive({
  selector: '[formatearImporte]',
  providers: [
    DecimalEspPipe,
    MascaraImportePipe
  ]
})
export class FormatearImporteDirective {
  @Input('formatearImporte') mascara = '15,2';

  constructor(
    private el: ElementRef,
    private decimalEspPipe: DecimalEspPipe,
    private mascaraImporte: MascaraImportePipe
  ) { }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/\./g, '');
  }

  @HostListener('blur') onblur() {
    this.el.nativeElement.value = this.decimalEspPipe.transform( this.el.nativeElement.value );
  }

  @HostListener('input') onInput() {
    this.el.nativeElement.value = this.mascaraImporte.transform( this.el.nativeElement.value, this.mascara );
  }

  // Con el evento keyup, corregiría después de cada pulsación
  // @HostListener('keyup') onKeyup() {
  //   this.el.nativeElement.value = this.mascaraImporte.transform( this.el.nativeElement.value, '15,2' );
  // }
}
