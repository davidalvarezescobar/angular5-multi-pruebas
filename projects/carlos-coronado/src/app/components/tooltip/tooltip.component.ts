import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    {{ msg }}
  `,
  styles: [`
    :host {
      position: absolute;
      display: inline-block;
      background-color: antiquewhite;
      padding: 2px;
    }
  `]
})
export class TooltipComponent implements OnInit {
  msg = 'sin tooltip';
  @HostBinding('style.top') top: string;
  @HostBinding('style.left') left: string;
  // @HostBinding('class.error') errorCss;

  constructor() { }

  ngOnInit() {
  }

}
