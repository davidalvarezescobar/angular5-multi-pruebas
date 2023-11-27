import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  // @HostBinding('class.visible') @Input() showModal = false;
  @HostBinding('class.visible') public isOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.isOpen = true;
  }

  hideModal() {
    this.isOpen = false;
  }
}
