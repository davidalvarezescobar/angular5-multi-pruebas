import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  tarea: string;
  completed: boolean;
}


@Injectable()
export class TodoService {
  private _todos$ = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todos$.asObservable();
  

  private get todos() {
    return this._todos$.value;
  }

  private set todos(data) {
    this._todos$.next(data);
  }


  addTodo({tarea}) { // extraemos la propiedad 'tarea' del objeto que se recibe como parámetro
    // const id = this.todos.length + 1;
    const id = new Date().getTime();
    const t: Todo = {tarea, id, completed: false};
    this.todos = [...this.todos, t];
  }

  deleteTodo(id) {
    // en un array de objetos, excluimos uno de ellos
    this.todos = this.todos.filter(t => t.id !== id);
  }

  completeTodo(id) {
    // en un array de objetos, cambiamos la propiedad de un objeto

    // con map (inmutable):
    this.todos = this.todos.map(t => t.id === id ? {...t, completed: true} : t);

    // con find (mutable):
    // this.todos.find(obj => obj.id === id).completed = true;
  }

}
