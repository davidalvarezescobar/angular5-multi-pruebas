import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <p>
    profile works!
    <a routerLink="/about">Go about</a>
    </p>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
