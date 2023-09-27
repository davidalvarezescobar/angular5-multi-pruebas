// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, ContentChild, AfterContentInit, HostBinding, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { InputHandlerDirective } from './input-handler.directive';
import { cleanSubscriptions, addSubscription } from '../../../globals';
import { timer } from 'rxjs';
import { tap } from 'rxjs';


@Component({
  selector: 'fa-input-better',
  template: `
    <i class="fa fa-{{icon}}"></i>
    <ng-content></ng-content>
  `,
  styleUrls: ['./fa-input-better.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaInputBetterComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @Input() icon: string;

  @ContentChild(InputHandlerDirective) input: InputHandlerDirective;
  @HostBinding('class.outline') focus = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const sub1$ = this.input.focus.subscribe(val => this.focus = val);
    const sub2$ = timer(0, 2000).pipe(
      tap(num => console.log('test:', num))
    ).subscribe();

    addSubscription(sub1$, sub2$);
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  ngOnDestroy() {
    cleanSubscriptions();
  }
}
