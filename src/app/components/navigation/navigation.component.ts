import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <h2>Recipe App</h2>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/api-data" routerLinkActive="active">API Data</a></li>
        <li><a routerLink="/form" routerLinkActive="active">Add Recipe</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #333;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand h2 {
      margin: 0;
    }
    .nav-links {
      list-style: none;
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-links a:hover, .nav-links a.active {
      background-color: #555;
    }
  `]
})
export class NavigationComponent { }