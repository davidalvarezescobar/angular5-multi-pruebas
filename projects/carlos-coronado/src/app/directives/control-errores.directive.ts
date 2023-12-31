import { Directive, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { ValidationService } from '../providers/validation.service';


@Directive({
  selector: '[handleErrors]'
})
export class HandleErrorsDirective implements OnInit, OnDestroy {
  private takeWhile = true;

  constructor(
    private container: ViewContainerRef,
    private control: NgControl,
    private validation: ValidationService
  ) {
    // mejor que posicionamiento relativo, voy a utilizar posicionamiento absoluto:
    // this.container.element.nativeElement.parentElement.style.position = 'relative';
  }

  ngOnInit() {
    this.control.valueChanges.pipe(
        takeWhile(() => this.takeWhile),
        // startWith(this.control.value) // con startWith, realizamos una primera validación nada más cargarse el formulario
      )
      .subscribe(val => this.validate());

    // Con el siguiente subscribe se comprueban los errores, tras realizar un submit.
    // Si no ponemos la directiva 'eventEmitter' en la template HTML donde está el tag <form>, no funcionaría
    this.control.control.root['eventEmitter'].pipe(
        takeWhile(() => this.takeWhile)
      )
      .subscribe(() => this.validate());
  }

  ngOnDestroy() { this.takeWhile = false; }

  validate() {
    this.container.clear();

    const errors = this.control.errors;
    for (const validatorType in errors) {
      if (errors.hasOwnProperty(validatorType)) {
        const rect = this.container.element.nativeElement.getBoundingClientRect();
        const offsetY = rect.top + window.pageYOffset;
        const offsetX = rect.left;

        const componentRef = this.container.createComponent(TooltipComponent);

        componentRef.instance.msg = this.validation.getMessage(validatorType, errors[validatorType]);
        componentRef.instance.top = `${offsetY+25}px`;
        componentRef.instance.left = `${offsetX}px`;
        return;
      }
    }
  }

}
