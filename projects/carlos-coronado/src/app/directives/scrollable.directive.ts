import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';
// import { fromEvent } from 'rxjs';


@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event']) onScroll(e) {
    const top = e.target.scrollTop;
    const height = this.el.nativeElement.scrollHeight;
    const offset = this.el.nativeElement.offsetHeight;

    // emit bottom event
    if (top > height - offset - 1) {
      // this.scrollPosition.emit('bottom')
      console.log('abajo');
    }

    // emit top event
    if (top === 0) {
      // this.scrollPosition.emit('top')
      console.log('top');
    }
  }

  ngAfterViewInit() {
    // fromEvent(this.el.nativeElement, 'scroll').subscribe(e => console.log(e));
  }

}
