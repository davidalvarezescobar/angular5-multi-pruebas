import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs'
import { shareReplay, map, tap, filter, ignoreElements } from 'rxjs/operators'
import { uuid } from './uuid';
import { TodosService } from './todos.service';

export interface Todo {
  id?: string;
  title: string;
  isCompleted: boolean;
}

export function initState<T>(fn: Function): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(
    tap(stateData => {
      if (stateData === undefined) {
        fn().pipe(ignoreElements()).subscribe();
      }
    }),
    shareReplay(1),
    filter(stateData => stateData !== undefined),
    tap(x => console.log('obtenido del store: ', x))
  );
}


@Injectable()
export class TodosStoreService {

  constructor(
    private todosService: TodosService
  ) { }

  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  private readonly _todos = new BehaviorSubject<Todo[] | undefined>(undefined);

  readonly todos$ = this._todos.pipe(
    initState(() => this.fetchAllTodos())
  );

  get todos(): Todo[] {
    return this._todos.getValue();
  }

  set todos(val: Todo[]) {
    this._todos.next(val);
  }


  readonly completedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => todo.isCompleted))
  );

  readonly uncompletedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.isCompleted))
  );

  addTodo(title: string) {
    if (title && title.length) {
      // This is an optimistic update
      // actualizamos el registro localmente antes de recibir una respuesta del servidor
      // de esta manera, la interfaz parece extremadamente rápida para el usuario
      // y simplemente asumimos que el servidor devolverá respuestas exitosas la mayoría del tiempo.
      // si el servidor devuelve un error, revertimos los cambios en la declaración catch.

      const tmpId = uuid();
      const tmpTodo = { id: tmpId, title, isCompleted: false };

      this.todos = [...this.todos, tmpTodo];

      this.todosService.create({ title, isCompleted: false }).subscribe({
        next: todo => {
          // we swap the local tmp record with the record from the server (id must be updated)
          const index = this.todos.indexOf(this.todos.find(t => t.id === tmpId));
          this.todos[index] = { ...todo };
          this.todos = [...this.todos];
        },
        error: err => {
          // is server sends back an error, we revert the changes
          console.error(err);
          this.removeTodo(tmpId, false);
        }
      });
    }

  }

  removeTodo(id: string, serverRemove = true) {
    const todo = this.todos.find(t => t.id === id);
    this.todos = this.todos.filter(todo => todo.id !== id);
    
    if (serverRemove) {
      // optimistic update
      this.todosService.remove(id).subscribe({
        error: err => {
          console.error(err);
          this.todos = [...this.todos, todo];
        }
      });

    }

  }

  setCompleted(id: string, isCompleted: boolean) {
    let todo = this.todos.find(todo => todo.id === id);

    if (todo) {
      // optimistic update
      const index = this.todos.indexOf(todo);
      this.todos[index] = { ...todo, isCompleted };
      this.todos = [...this.todos];

      this.todosService.setCompleted(id, isCompleted).subscribe({
        error: err => {
          console.error(err);
          this.todos[index] = { ...todo, isCompleted: !isCompleted };
        }
      });
    }
  }


  fetchAllTodos() {
    // una vez obtenidos los datos iniciales, son seteados en el store
    return this.todosService.index().pipe(
      tap((data: any) => this.todos = data)
    );
  }

}