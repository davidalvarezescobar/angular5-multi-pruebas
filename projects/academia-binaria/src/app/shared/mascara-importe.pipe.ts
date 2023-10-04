import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraImporte'
})
export class MascaraImportePipe implements PipeTransform {
  private latestValue = '';
  private separador;
  private arg: Array<string>; // en la posición 0 se indicará el número de enteros; en la posición 1 se indicará el número de decimales; ambos no como 'number' si no como 'string'

  constructor() {}

  /**
   * Transforms mascara importe pipe
   * @param value
   * @param args será la máscara que indicará el número de enteros y decimales, separados por cualquier caracter no numérico
   * @returns transform 
   */
  transform(value: any, args: any): any {
    if (!value) { return ''; }
    if (!this.separador) {
      // eliminamos todos los dígitos numéricos de la cadena de texto para obtener el separador
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
