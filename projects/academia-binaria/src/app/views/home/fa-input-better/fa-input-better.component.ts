// tslint:disable-next-line:max-line-length
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, HostBinding, Input, OnDestroy } from '@angular/core';
import { addSubscription, cleanSubscriptions } from '../../../globals';
import { InputHandlerDirective } from './input-handler.directive';


@Component({
  selector: 'fa-input-better',
  template: `
    <i class="fa fa-{{icon}}"></i>
    <ng-content></ng-content>
  `,
  styleUrls: ['./fa-input-better.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaInputBetterComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input() icon: string;

  @ContentChild(InputHandlerDirective) input: InputHandlerDirective;
  @HostBinding('class.outline') focus = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    const sub1$ = this.input.focus.subscribe(val => this.focus = val);

    addSubscription(sub1$);
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  ngOnDestroy() {
    cleanSubscriptions();
  }
}
