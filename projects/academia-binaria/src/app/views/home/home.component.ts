import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  inputProps = [
    { pHolder: 'hola', icon: 'lock' },
    { pHolder: 'tron', icon: 'music' }
  ];
  value;

  constructor() { }

  ngOnInit() { }

  add() {
    this.inputProps.push(
      {pHolder: `numero${this.inputProps.length + 1}`, icon: 'envelope'}
    );
  }

}
