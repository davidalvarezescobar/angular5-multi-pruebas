import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContextMenu, ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-context-menu-app',
  templateUrl: './context-menu-app.component.html',
  styleUrls: ['./context-menu-app.component.css']
})
export class ContextMenuAppComponent {
  @ViewChild(ContextMenuComponent, { read: ElementRef }) todoTitleInput: ElementRef;
  isDisplayed: boolean;
  menuItems: Array<ContextMenu> = [];
  menuPositionX: number;
  menuPositionY: number;
  menuStyle: {
    [klass: string]: any;
  };

  display(event: MouseEvent) {
    this.isDisplayed = true;
    this.menuItems = [
      { text: 'Refactor', handler: 'Handle refactor' },
      { text: 'Format', handler: 'Handle format' }
    ];
    this.menuPositionX = event.clientX;
    this.menuPositionY = event.clientY;

    setTimeout(() => this.getMenuStyle());
  }

  getMenuStyle() {
    const windowHeight = window.innerHeight;
    const distanciaParteInferior = windowHeight - this.menuPositionY;
    const alturaMenu = this.todoTitleInput.nativeElement.offsetHeight;

    const left = this.menuPositionX;
    let top = this.menuPositionY;

    if (distanciaParteInferior < alturaMenu) {
      // Si está cerca de la parte inferior, muéstralo por encima
      top = this.menuPositionY - alturaMenu - 5;
    }

    this.menuStyle = {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`
    };
  }

  handleMenuEvent(event: any) {
    this.isDisplayed = false;
    console.log('Evento lanzado por el componente "context-menu"', event);
  }

}
