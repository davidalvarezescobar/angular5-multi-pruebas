import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  inputProps = [
    { pHolder: 'hola', icon: 'lock' },
    { pHolder: 'tron', icon: 'music' }
  ];
  value;


  add() {
    this.inputProps.push(
      {pHolder: `numero${this.inputProps.length + 1}`, icon: 'envelope'}
    );
  }

}
