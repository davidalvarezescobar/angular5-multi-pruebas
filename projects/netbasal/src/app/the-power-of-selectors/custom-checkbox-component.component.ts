import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox-component',
  template: `
    checkbox:
    <input type="checkbox" class="ngx-checkbox" [formControl]="control">
    {{control.value}}
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CustomCheckboxComponentComponent implements OnInit {
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
