import { Directive, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { EventEmitter } from 'events';

@Directive({
  selector: '[submitEmitter]'
})
export class SubmitEmitterDirective implements OnInit {

  constructor(
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit() {
    console.log('FormGroupDirective: ', this.formGroupDirective);
    // Incluyo el eventEmitter "ngSubmit" (exclusivo del lost template form) dentro de la propiedad "control",
    // ya que es ahí en donde se encuentra el formGroup raiz (el formulario).
    // Hago esta ñapa para que el eventEmitter "ngSubmit", pueda estar disponible en los reactive form:
    this.formGroupDirective.control['eventEmitter'] = this.formGroupDirective.ngSubmit;
  }
}
