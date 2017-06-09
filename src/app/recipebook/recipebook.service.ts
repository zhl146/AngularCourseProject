import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { AppHttpService } from '../shared/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Response } from '@angular/http';
import { stockRecipes } from './stock-recipes.const';

// this is the recipe data service
// it holds the recipes array and shares it among all subscribers
@Injectable()
export class RecipebookService {
  private recipeList = new BehaviorSubject<Recipe[]>([]);
  private stockRecipes = stockRecipes;

  constructor( private http: AppHttpService ) {
    this.http.getRecipes()
      .subscribe(
        (recipes) => {
          if (recipes) {
            this.recipeList.next(recipes);
          } else {
            this.recipeList.next(this.stockRecipes);
          }
        }
      );
  }

  getRecipes() {
    return this.recipeList.asObservable();
  }

  // returns a specific recipe
  getRecipeByIndex(recIndex: number): Recipe {
    return this.recipeList.getValue()[recIndex];
  }

  // adds a recipe to the end of the array and updates all subscribers
  addRecipe(recipe: Recipe) {
    let updatedRecipes = this.recipeList.getValue();
    if (!updatedRecipes) {
      updatedRecipes = [];
    }
    updatedRecipes.push(recipe);
    this.recipeList.next(updatedRecipes);
    this.updateServer();
  }

  // deletes a recipe out of the array by index and updates all subscribers
  deleteRecipe(index: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes.splice(index, 1);
    this.recipeList.next(updatedRecipes);
    this.updateServer();
  }

  // updates a specific recipe in the array by index and updates all subscribers
  editRecipe(changedRecipe: Recipe, recipeIndex: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes[recipeIndex] = changedRecipe;
    this.recipeList.next(updatedRecipes);
    this.updateServer();
  }

  updateServer() {
    // alphabetizes the recipe list before it gets sent to server
    const recipes = this.recipeList.getValue();
    recipes.sort(
      (a, b) => {
        if (a > b) {
          return +1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      }
    );
    this.http.saveRecipes(this.recipeList.getValue())
      .subscribe();
  }
}
