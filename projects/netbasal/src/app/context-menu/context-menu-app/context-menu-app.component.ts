import { Component } from '@angular/core';
import { ContextMenu } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-context-menu-app',
  templateUrl: './context-menu-app.component.html',
  styleUrls: ['./context-menu-app.component.css']
})
export class ContextMenuAppComponent {
  isDisplayed: boolean;
  menuItems: Array<ContextMenu> = [];
  menuPositionX: number;
  menuPositionY: number;

  display(event: MouseEvent) {
    this.isDisplayed = true;
    this.menuItems = [
      { text: 'Refactor', handler: 'Handle refactor' },
      { text: 'Format', handler: 'Handle format' }
    ];
    this.menuPositionX = event.clientX;
    this.menuPositionY = event.clientY;
  }

  getMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.menuPositionX}px`,
      top: `${this.menuPositionY}px`
    };
  }

  handleMenuEvent(event: any) {
    this.isDisplayed = false;
    console.log('Evento lanzado por el componente "context-menu"', event);
  }

}
