import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiRecipe {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strCategory: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b'; // recipes starting with 'b'

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<{ meals: ApiRecipe[] }> {
    return this.http.get<{ meals: ApiRecipe[] }>(this.apiUrl);
  }
}
