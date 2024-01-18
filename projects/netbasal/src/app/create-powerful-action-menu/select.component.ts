import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, fromEvent, pluck, takeWhile, tap } from 'rxjs';


@Component({
  selector: 'app-select',
  template: `
    <div class="select" #div>
      <span>{{selected.label}}</span>
    </div>
    <ul class="options" [ngStyle]="optionsStyles" #ul>
      <li *ngFor="let option of options"
        (click)="this.selected=option">{{option.label}}
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class SelectComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() options;
  @Input() selectedOption: string;

  @ViewChild('div', { static: true }) _select;
  @ViewChild('ul', { static: true }) _options;

  open = false;
  selected;
  optionsStyles = {
    top: '',
    width: '',
    display: 'block',
    visibility: 'hidden'
  };
  optionsDOMRect;

  takeWhile = true;


  constructor() { }

  ngOnInit() {
    this.selected = this.getOperationByLabel(this.selectedOption);
    this.calcularAncho();
    this.listen_DocumentClick();
    this.listen_WindowResize();

    // window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngAfterViewInit() {
    this.optionsDOMRect = this._options.nativeElement.getBoundingClientRect();
    this.optionsStyles.display = 'none';
    this.optionsStyles.visibility = 'visible';
  }


  ngOnDestroy() { this.takeWhile = false; }

  // @HostListener('document:click', ['$event.target']) document_click(target) {
  //   if (this._select.nativeElement.contains(target)) {
  //     this.open = !this.open;
  //   } else {
  //     this.open = false;
  //   }
  //   if (this.open) {
  //     this.calcularPosition();
  //     this.optionsStyles.display = 'block';
  //   } else {
  //     this.optionsStyles.display = 'none';
  //   }
  // }
  listen_DocumentClick() {
    fromEvent(document, 'click').pipe(
      takeWhile(() => this.takeWhile),
      pluck('target'),
      tap(() => console.log('SelectComponent:document-click'))
    ).subscribe(target => {
      if (this._select.nativeElement.contains(target)) {
        this.open = !this.open;
      } else {
        this.open = false;
      }

      if (this.open) {
        this.calcularPosition();
        this.calcularAncho();
        this.optionsStyles.display = 'block';
      } else {
        this.optionsStyles.display = 'none';
      }
    });
  }


  // @HostListener('window:resize', ['$event.target.innerWidth']) onResize(width) {
  //   this.calcularAncho();
  // }
  listen_WindowResize() {
    fromEvent(window, 'resize').pipe(
      takeWhile(() => this.takeWhile),
      filter(() => this.open),
      pluck('target', 'innerWidth'),
      distinctUntilChanged(),
      tap(() => console.log('SelectComponent:window-resize'))
    ).subscribe(() => {
      this.calcularAncho();
    });
  }


  private getOperationByLabel(label) {
    return this.options.find(o => o.label === label);
  }

  private calcularAncho() {
    const selectDOMRect = this._select.nativeElement.getBoundingClientRect();
    const { width: anchoSelect } = selectDOMRect;
    this.optionsStyles.width = `${anchoSelect}px`;
  }

  private calcularPosition() {
    const selectDOMRect = this._select.nativeElement.getBoundingClientRect();
    const { height: altoSelect, top } = selectDOMRect;
    const { height: altoOptions } = this.optionsDOMRect;
    const altoCombo = altoSelect + altoOptions;
    const distanciaToTop = top + window.pageYOffset;
    const topCondicional = (top + altoCombo > window.innerHeight) ? distanciaToTop - altoOptions : distanciaToTop + altoSelect;
    this.optionsStyles.top = `${topCondicional}px`;
  }
}
