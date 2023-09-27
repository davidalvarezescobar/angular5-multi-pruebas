import { Directive, HostBinding, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';


@Directive({
  selector: '.ngx-checkbox'
})
export class CustomCheckboxDirectiveDirective implements AfterViewInit {
  @HostBinding('attr.role') role = 'checkbox';
  @HostBinding('attr.aria-checked') checked = false;
  @HostBinding('attr.tabindex') tabIndex = 0;

  constructor( private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  @HostListener('change', ['$event.target.checked'])
  change( checked ) { // se recibe como parametro: $event.target.checked
    console.log(checked);
    this.checked = checked;
    this.cdr.detectChanges();
  }
}
