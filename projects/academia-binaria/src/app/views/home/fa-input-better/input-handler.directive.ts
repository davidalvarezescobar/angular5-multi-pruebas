import { Directive, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[inputHandler]'
})
export class InputHandlerDirective {
  focus = new EventEmitter();

  constructor() { }

  @HostListener('focus') onfocus() {
    this.focus.emit(true);
  }
  @HostListener('blur') onBlur() {
    this.focus.emit(false);
  }

}
