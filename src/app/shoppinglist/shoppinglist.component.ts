import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: string[] = [];
  private ingredientSubscription: Subscription;
  private initialized: boolean;

  formGroup: FormGroup;
  ingredientArray: FormArray;

  constructor( private shoppingService: ShoppinglistService ) { }

  // LIFECYCLE

  ngOnInit() {
    this.initialized = false;
    this.formInit();

    this.ingredientSubscription = this.shoppingService.getShoppingSubject()
      .subscribe(
        (ingredients: string[]) => {
          this.ingredients = ingredients;

          // we only initialize the forms the first time the component is created
          // otherwise, we will have to blow up the entire form every time the data changes
          if (this.initialized === false) {
            // populate input fields with existing ingredients
            for (const ingredient of this.ingredients) {
              this.ingredientArray.push(
                new FormGroup({
                  text: new FormControl(ingredient)
                })
              );
            }

            // always have an empty input at the end so user can add more items
            this.addListItem();

            // never have to set this to false again
            // only needs to be set to false when the user leaves
            // if that happens, then the component is destroyed
            this.initialized = true;
          }
        }
      );
  }

  // clean up to prevent memory leak
  ngOnDestroy() {
    this.shoppingService.updateDatabase();
    this.ingredientSubscription.unsubscribe();
  }

  // METHODS

  // initialize the form
  // code is here to shorten ngOnInit

  formInit() {
    this.ingredientArray = new FormArray([]);
    this.formGroup = new FormGroup({
      ingredients: this.ingredientArray
    });
  }

  // automatically adds an empty input at the end for user to add new items
  // I think this is better than having to click a plus button
  autoAddNewItem(index: number) {
    if ( this.isLastElement(index) ) {
      this.addListItem();
    }
  }

  // adds an empty input at the end of the array
  addListItem() {
    this.ingredientArray.push(
      new FormGroup({
        'text': new FormControl('')
      })
    );
  }

  // checks to see if the item with this index is the last in the array
  isLastElement(index: number) {
    return (index === this.ingredientArray.length - 1);
  }

  // converts control values into a string array
  // updates ingredients data service with a the array
  updateIngredients() {
    const newIngredients: string[] = [];
    for (const ingredientGroup of (<FormArray>this.formGroup.get('ingredients')).controls) {
      newIngredients.push(ingredientGroup.get('text').value);
    }

    // pops the last (always empty) input
    newIngredients.pop();
    this.shoppingService.updateIngredients(newIngredients);
  }

  updateIngredient(index: number) {
    // pretty convoluted to get the value on the text in input array
    const updatedIngredient: string = (<FormArray>this.formGroup.get('ingredients')).controls[index].get('text').value;
    this.shoppingService.updateIngredient(updatedIngredient, index);
  }

  // deletes a list item when the x is clicked
  onDeleteClicked(index: number) {
    if (!this.isLastElement(index)) {
      this.ingredientArray.removeAt(index);
      this.shoppingService.deleteIngredient(index);
    }
  }
}
