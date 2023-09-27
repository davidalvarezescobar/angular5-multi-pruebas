// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'fa-input',
  template: `
    <i [class]="iClass"></i>
    <input type="text" #input
        [placeholder]="pHolder"
        (focus)="focus=true"
        (blur)="focus=false"
        (keyup)="value.emit(input.value)">
  `,
  styleUrls: ['./fa-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaInputComponent implements OnInit, AfterViewInit {

  @Input() placeHolder: string;
  @Input() icon: string;
  @Output() value = new EventEmitter();

  @HostBinding('class.outline') focus = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  get iClass() {
    console.log('getter iClass', this.icon);
    return `fa fa-${this.icon}`;
  }

  get pHolder() {
    console.log('getter pHolder', this.placeHolder);
    return this.placeHolder.trim();
  }

}
