import { Component, OnInit, Input, ContentChild, HostBinding, Attribute } from '@angular/core';
import { OutlineBorderDirective } from '../../directives/outline-border.directive';

@Component({
  selector: 'app-fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.less']
})
export class FaInputComponent implements OnInit {
  @ContentChild(OutlineBorderDirective) outlineBorder: OutlineBorderDirective;

  @HostBinding('class.outline') get classOutline() {
    return this.outlineBorder.focus;
  }

  constructor(@Attribute('faIcon') public faIcon ) { }

  ngOnInit() { }

}
