// tslint:disable-next-line:max-line-length
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';


@Component({
  selector: 'fa-input',
  template: `
    <i [class]="iconClass"></i>
    <input type="text" #input
        [placeholder]="pHolder"
        (focus)="focus=true"
        (blur)="focus=false"
        (keyup)="value.emit(input.value)">
  `,
  styleUrls: ['./fa-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaInputComponent implements AfterViewInit {

  @Input() placeHolder: string;
  @Input() icon: string;
  @Output() value = new EventEmitter();

  @HostBinding('class.outline') focus = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  get iconClass() {
    console.log('getter iconClass', this.icon);
    return `fa fa-${this.icon}`;
  }

  get pHolder() {
    console.log('getter pHolder', this.placeHolder);
    return this.placeHolder.trim();
  }

}
