import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraImporte'
})
export class MascaraImportePipe implements PipeTransform {
  private latestValue = '';
  private separador;
  private arg;

  constructor() {}

  transform(value: any, args: any): any {
    if (!value) { return ''; }
    if (!this.separador) {
      this.separador = args.split(/\d/).join('');
      this.arg = args.split(this.separador);
    }
    const regExpString = new RegExp('^[\\d]{1,' + this.arg[0] + '}(\\' + this.separador + '[\\d]{0,' + this.arg[1] + '})?$');
    if ( !regExpString.test(value) ) {
      return this.latestValue;
    }
    this.latestValue = value;
    return value;
  }
}
