import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos$ = this.todoService.todos$;
  }

  addTodo(obj) {
    this.todoService.addTodo(obj);
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id);
  }

  completeTodo(id) {
    this.todoService.completeTodo(id);
  }

}
