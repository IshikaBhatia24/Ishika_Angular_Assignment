import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Welcome to Todo App</h1>

      <div class="todo-section">
        <h2>Your Todos</h2>
        <div class="todo-list">
          <div *ngFor="let todo of todos$ | async" class="todo-item">
            <input 
              type="checkbox" 
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)"
            >
            <span [class.completed]="todo.completed">{{ todo.title }}</span>
            <button class="delete-btn" (click)="deleteTodo(todo.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .todo-section {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .todo-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
    .todo-item:last-child {
      border-bottom: none;
    }
    .completed {
      text-decoration: line-through;
      color: #888;
    }
    .delete-btn {
      background-color: #ff4444;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      margin-left: auto;
    }
    .delete-btn:hover {
      background-color: #cc0000;
    }
  `]
})
export class HomeComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  ngOnInit(): void {}

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}