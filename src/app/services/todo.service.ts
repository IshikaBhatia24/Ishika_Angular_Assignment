import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
    { id: 3, title: 'Deploy to Production', completed: false }
  ];

  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);
  public todos$ = this.todosSubject.asObservable();

  constructor() { }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      completed: false
    };
    this.todos.push(newTodo);
    this.todosSubject.next([...this.todos]);
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosSubject.next([...this.todos]);
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todosSubject.next([...this.todos]);
  }
}