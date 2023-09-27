import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'decimalEsp'
})
export class DecimalEspPipe extends DecimalPipe implements PipeTransform {

  override transform(value: any, args?: any): any {
    if (value < 0) { return ''; }
    try {value = value.replace(',', '.'); } catch (e) {}
    return super.transform( value, '.2-2' );
  }
}
