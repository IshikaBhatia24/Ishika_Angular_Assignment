import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-form-page',
  template: `
    <div class="form-container">
      <h1>Add Recipe</h1>
      <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
        <div>
          <label for="title">Title *</label>
          <input id="title" formControlName="title" />
          <div *ngIf="recipeForm.get('title')?.invalid && recipeForm.get('title')?.touched" class="error">
            Title is required
          </div>
        </div>
        <div>
          <label for="ingredients">Ingredients *</label>
          <textarea id="ingredients" formControlName="ingredients"></textarea>
          <div *ngIf="recipeForm.get('ingredients')?.invalid && recipeForm.get('ingredients')?.touched" class="error">
            Ingredients are required
          </div>
        </div>
        <div class="form-group">
    <label for="category">Category *</label>
    <input 
      type="text" 
      id="category" 
      formControlName="category" 
      class="form-control"
      [class.error]="recipeForm.get('category')?.invalid && recipeForm.get('category')?.touched"
    >
    <div *ngIf="recipeForm.get('category')?.invalid && recipeForm.get('category')?.touched" class="error-message">
      <span *ngIf="recipeForm.get('category')?.errors?.['required']">Category is required</span>
    </div>
  </div>
        <button type="submit" [disabled]="recipeForm.invalid">Add Recipe</button>
      </form>
      <div *ngIf="submitted" class="success">Recipe added successfully!</div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 2rem auto;
    }
    label {
      display: block;
      margin-top: 1rem;
    }
    input, textarea {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    .error {
      color: red;
      font-size: 0.875rem;
    }
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    .success {
      margin-top: 1rem;
      color: green;
    }
  `]
})
export class FormPageComponent {
  recipeForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.recipeForm.valid) {
    const { title, ingredients, category } = this.recipeForm.value;
    this.recipeService.addRecipe(title, ingredients, category);
    this.recipeForm.reset();
    this.submitted = true;

    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }
}

}
