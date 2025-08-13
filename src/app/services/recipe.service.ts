import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  favorite: boolean;
  category: string; 
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
  { id: 1, title: 'Spaghetti Carbonara', ingredients: 'Spaghetti, Eggs, Bacon, Parmesan', category: 'Italian', favorite: false },
  { id: 2, title: 'Tomato Soup', ingredients: 'Tomatoes, Onion, Garlic, Basil', category: 'Soup', favorite: false }
];

  private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);
  public recipes$ = this.recipesSubject.asObservable();

  constructor() {}

  addRecipe(title: string, ingredients: string, category: string): void {
  const newRecipe: Recipe = {
    id: Date.now(),
    title,
    ingredients,
    category,
    favorite: false
  };
  this.recipes.push(newRecipe);
  this.recipesSubject.next([...this.recipes]);
}

  toggleFavorite(id: number): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.favorite = !recipe.favorite;
      this.recipesSubject.next([...this.recipes]);
    }
  }
}
