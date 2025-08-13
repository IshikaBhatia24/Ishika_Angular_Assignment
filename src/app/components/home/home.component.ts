import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Recipe Book</h1>
      <div *ngFor="let recipe of recipes$ | async" class="recipe-item">
  <h3>{{ recipe.title }} <small>({{ recipe.category }})</small></h3>
  <p>{{ recipe.ingredients }}</p>
  <button (click)="toggleFavorite(recipe.id)">
    {{ recipe.favorite ? 'Unfavorite' : 'Favorite' }}
  </button>
</div>

    </div>
  `,
  styles: [`
    .home-container {
      max-width: 600px;
      margin: 2rem auto;
    }
    .recipe-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class HomeComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.recipes$;
  }

  ngOnInit(): void {}

  toggleFavorite(id: number): void {
    this.recipeService.toggleFavorite(id);
  }
}
