import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  getMessage(validatorType, validatorInfo) {
    const errors = {
      required: 'Campo obligatorio',
      minlength: `Tamaño mínimo: ${validatorInfo.requiredLength} caracteres`,
      eventCode: 'Sólo números'
    };
    return errors[validatorType];
  }

}
