import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) { return; }
    return value.sort(function(a, b){
      let numberDirection = args.direction ? 1 : -1; // si recibimos un booleano lo convertimos a 1 ó -1

      let valA = a[args.property] || '';
      let valB = b[args.property] || '';
      if (valA) valA = valA.toLowerCase();
      if (valB) valB = valB.toLowerCase();

      if (valA < valB) {
        return -1 * numberDirection;
      } else if (valA > valB) {
        return 1 * numberDirection;
      } else {
        return 0;
      }
    });
  }

}
