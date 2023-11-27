import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ContextMenu {
  text: string;
  handler: string;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  @Input() menuItems: Array<ContextMenu>;

  @Output() contextMenuClick = new EventEmitter();

  onContextMenuClick(event: MouseEvent, menuHandler: string) {
    this.contextMenuClick.emit({ event, menuHandler });
  }

}
