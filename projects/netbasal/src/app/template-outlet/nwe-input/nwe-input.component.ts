import { Component, OnInit, ElementRef, AfterViewInit, Attribute } from '@angular/core';

@Component({
  selector: 'nwe-input',
  templateUrl: './nwe-input.component.html',
  styleUrls: ['./nwe-input.component.less']
})
export class NweInputComponent implements OnInit {

  constructor(
    @Attribute('img') public faIcon,
    private host: ElementRef
  ) { }

  ngOnInit() {
    this.host.nativeElement.querySelector('input').setAttribute('id', 'text');
  }

}
