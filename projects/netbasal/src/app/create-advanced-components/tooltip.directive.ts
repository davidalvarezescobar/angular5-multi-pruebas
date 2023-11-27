import { ComponentRef, Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltipContent: string;
  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private container: ViewContainerRef
    ) { }

  @HostListener('mouseenter') mouseenter() {
    if (this.componentRef) {
      return;
    }

    this.componentRef = this.container.createComponent(TooltipComponent);

    this.componentRef.instance.content = this.tooltipContent;
    this.componentRef.instance.parentPosition = this.container.element.nativeElement.getBoundingClientRect();
    console.log('parent position:', this.container.element.nativeElement.getBoundingClientRect());
  }

  @HostListener('mouseout') mouseout() {
    this.componentRef.destroy();
    this.componentRef = undefined;
  }
}
