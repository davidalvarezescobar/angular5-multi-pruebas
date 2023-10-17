import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Todo } from '../todos-store.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Output() complete = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}