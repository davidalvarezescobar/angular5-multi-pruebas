import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.less']
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() done = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

}
