import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <span>{{ msg }}</span>
  `,
  styles: [`
    :host {
      position: absolute;
      background-color: antiquewhite;
      top: -18px;
      left: 10px;
    }
  `]
})
export class TooltipComponent implements OnInit {
  msg = 'sin tooltip';
  // @HostBinding('class.error') errorCss;

  constructor() { }

  ngOnInit() {
  }

}
