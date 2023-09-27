import { ComponentRef, Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';


@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') msg;
  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private container: ViewContainerRef
  ) {
    this.container.element.nativeElement.parentElement.style.position = 'relative';
  }


  @HostListener('mouseenter') mouseenter() {
    if (this.componentRef) {return; }

    this.componentRef = this.container.createComponent(TooltipComponent);

    this.componentRef.instance.msg = this.msg;
  }

  @HostListener('mouseleave') mouseleave() {
    this.container.clear();
    this.componentRef = undefined;
  }
}
