import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { combineLatest, map, filter } from 'rxjs';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { SpinnerService } from '../spinner.service';

@Directive({
  selector: '[spinnerName]'
})
export class SpinnerDirective implements AfterViewInit {
  @Input() spinnerName: string; // Admite o un único nombre, o varios nombres separados por comas
  @Input() spinnerAppend?: 'child'; // El spinner será insertado como hijo del elemento en donde se está aplicando la directiva
  @Output() isLoading = new EventEmitter<boolean>();
  
  private elementStyle;
  private initialElementDisplay; // none, block, flex, etc.
  private initialElementPosition; // relative, absolute, fixed, etc.

  constructor(
    readonly spinnerSrv: SpinnerService,
    readonly vcRef: ViewContainerRef,
    readonly elementRef: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    if (!this.spinnerName) {
      return;
    }

    this.elementStyle = this.elementRef.nativeElement.style;

    const arrSpinnerName = this.spinnerName.split(',');
    const arrSpinnerName$ = arrSpinnerName.map(spinnerName => this.spinnerSrv.getState(spinnerName.trim()));

    combineLatest(arrSpinnerName$).pipe(
      map((arr: boolean[]) => {
        const allTrue = arr.every(value => value === true);
        const allFalse = arr.every(value => value === false);
        if (allTrue) {
          return true;
        } else if (allFalse) {
          return false;
        } else {
          return undefined;
        }
      }),
      filter(result => result !== undefined)
    ).subscribe(loading => this.onLoading(loading));
  }

  private onLoading(loading: boolean) {
    if (loading) {
      const spinner = this.vcRef.createComponent(SpinnerComponent);
      if (this.spinnerAppend === 'child') {
        // append como hijo:
        this.elementRef.nativeElement.appendChild(spinner.location.nativeElement);
        this.initialElementPosition = this.elementStyle.position;
        this.elementStyle.position = 'relative';

      } else {
        // append como hermano:
        this.initialElementDisplay = this.elementStyle.display;
        this.elementStyle.display = 'none';
      }
      this.isLoading.emit(true);

    } else {
      this.vcRef.remove();
      if (this.initialElementPosition !== undefined) {
        // si append como hijo
        this.elementStyle.position = this.initialElementPosition;
      }
      if (this.initialElementDisplay !== undefined) {
        // si append como hermano
        this.elementStyle.display = this.initialElementDisplay;
      }
      this.isLoading.emit(false);
    }
  }

}
