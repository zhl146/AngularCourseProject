import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Recipe} from '../recipebook/recipe.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppinglistService {

  ingredientsSubject = new Subject<Ingredient[]>();

  // dummy ingredient array
  // will remove it later and probably move this functionality to a service
  // service will most likely http call to a server for ingredient lists

  private ingredients: Ingredient[] = [
    new Ingredient('mole', 76876, 'mole'),
    new Ingredient('derp', 123234, 'things')
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  // adds an ingredient object to the ingredients array
  // results in a new ingredient being displayed to the user
  // method should be called when an event is fired from the shopping-edit component

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.updateSubject();
  }

  // takes an index of the ingredients array and deletes it
  // results in that ingredient being removed from the user view
  // method should be called when an event is fired from the shopping-edit component

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateSubject();
  }

  addIngredientsFromRecipe(recipe: Recipe) {
    this.ingredients.push(...recipe.ingredients);
    this.updateSubject();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updateSubject();
  }

  updateIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.updateSubject();
  }

  updateSubject() {
    this.ingredientsSubject.next(this.ingredients.slice());
  }

}