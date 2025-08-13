import { Component, OnInit } from '@angular/core';
import { ApiService, ApiRecipe } from '../../services/api.service';

@Component({
  selector: 'app-api-data',
  template: `
    <div class="api-data-container">
      <h1>Recipes from API</h1>
      <button (click)="loadRecipes()">Load Recipes</button>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="recipes.length > 0">
        <div *ngFor="let recipe of recipes" class="api-recipe-card">
          <h3>{{ recipe.strMeal }}</h3>
          <p><strong>Category:</strong> {{ recipe.strCategory }}</p>
          <p>{{ recipe.strInstructions | slice:0:150 }}...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-data-container {
      max-width: 700px;
      margin: 2rem auto;
    }
    .api-recipe-card {
      border: 1px solid #ddd;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
    }
    button {
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `]
})
export class ApiDataComponent implements OnInit {
  recipes: ApiRecipe[] = [];
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  loadRecipes(): void {
    this.loading = true;
    this.apiService.getRecipes().subscribe({
      next: data => {
        this.recipes = data.meals || [];
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching recipes:', err);
        this.loading = false;
      }
    });
  }
}
