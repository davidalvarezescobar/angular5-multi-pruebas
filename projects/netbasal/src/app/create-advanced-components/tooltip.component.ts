import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    {{content}}
  `,
  styles: [`
    :host {
      position: absolute;
      display: block;
      background-color: chocolate;
      height: 20px;
      padding: 4px;
    }
  `]
})
export class TooltipComponent implements OnInit {
  @HostBinding('style.top') top: string;
  @HostBinding('style.left') left: string;

  content: string;
  parentPosition; // : DOMRect;
  

  constructor(
    private host: ElementRef
  ) { }

  ngOnInit() {
    // mediante destructuring obtenemos la propiedad top y height
    const { top, left } = this.parentPosition;
    const { height } = this.host.nativeElement.getBoundingClientRect();
    const distanciaToTop = top + window.pageYOffset;
    this.top = `${distanciaToTop - height}px`;
    this.left = `${left}px`;
  }

}
