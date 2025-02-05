import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent {
  @Input() todos = [];
  @Output() done = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

}
