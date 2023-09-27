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
    // mejor que posicionamiento relativo, voy a utilizar posicionamiento absoluto:
    // this.container.element.nativeElement.parentElement.style.position = 'relative';
  }


  @HostListener('mouseenter') mouseenter() {
    if (this.componentRef) {return; }

    const rect = this.container.element.nativeElement.getBoundingClientRect();
    const offsetY = rect.top + window.pageYOffset;
    const offsetX = rect.left;

    this.componentRef = this.container.createComponent(TooltipComponent);

    this.componentRef.instance.msg = this.msg;
    this.componentRef.instance.top = `${offsetY-20}px`;
    this.componentRef.instance.left = `${offsetX}px`;
  }

  @HostListener('mouseleave') mouseleave() {
    this.container.clear();
    this.componentRef = undefined;
  }
}
