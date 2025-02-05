import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  /**
   * Transforms order by pipe
   * param value: any
   * param args?: any
   * returns transform
   */
  transform(value: any, args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.sort((a: any, b: any) => {
      const numberDirection = args.reverse ? -1 : 1;
      let valA = this.getValue(a, args.column);
      let valB = this.getValue(b, args.column);

      valA = this.formatVal(valA);
      valB = this.formatVal(valB);
      if (valA < valB) {
        return -1 * numberDirection;
      } else if (valA > valB) {
        return 1 * numberDirection;
      } else {
        return 0;
      }
    });
  }

  /**
   * Formats val
   * param val: any
   * returns val
   */
  private formatVal(val: any): any{
    if (val) {
      if (typeof val === 'string') {
        return parseFloat(val) || val.toLowerCase();
      } else if (val instanceof Date) {
        return val.getTime();
      }
    }
    return val;
  }

  /**
   * Gets value
   * param obj
   * param key
   * returns
   */
  private getValue(obj: any, key: any): any {
    if (key) {
      return key.split('.').reduce((o: any, p: any) => {
        return o[p] ?? 0;
      }, obj);
    }
    return '';
  }
}
