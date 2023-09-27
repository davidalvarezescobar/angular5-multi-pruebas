import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[outlineBorder]'
})
export class OutlineBorderDirective {
  focus = false;

  constructor() { }

  @HostListener('focus') onFocus() {
    this.focus = true;
  }

  @HostListener('blur') onblur() {
    this.focus = false;
  }

}
