import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: string[];
  private ingredientSubscription: Subscription;

  ingForm: FormGroup;
  ingredientArray: FormArray;

  constructor( private shoppingService: ShoppinglistService,
               private auth: AuthService,
               private fb: FormBuilder ) { }

  // LIFECYCLE

  ngOnInit() {
    this.createForm();

    this.ingredientSubscription = this.shoppingService.getShoppingSubject()
      .subscribe(
        (ingredients: string[] | null) => {
          let init = false;

          if (!this.ingredients && ingredients) {
            init = true;
          }
          // now update the local array
          this.ingredients = ingredients;

          // we only initialize the forms the first time the component is created
          // otherwise, we will have to blow up the entire form every time the data changes
          // this.ingredientArray.removeAt(0);
          // populate input fields with existing ingredients
          if (init) {
            for (const ingredient of this.ingredients) {
              this.ingredientArray.push(
                new FormGroup({
                  text: new FormControl(ingredient)
                })
              );
            }
            // always have an empty input at the end so user can add more items
            this.addListItem();
          }
        }
      );

    this.shoppingService.getServerList();
  }

  // clean up to prevent memory leak
  ngOnDestroy() {
    if ( this.auth.getToken() ) {
      console.log(this.auth.getToken());
      this.shoppingService.updateDatabase();
    }
    this.ingredientSubscription.unsubscribe();
  }

  // METHODS

  // initialize the form
  // code is here to shorten ngOnInit

  createForm() {
    this.ingredientArray = this.fb.array([]);
    this.ingForm = this.fb.group({
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
      this.fb.group({
        text: ''
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
    for (const ingredientGroup of (<FormArray>this.ingForm.get('ingredients')).controls) {
      newIngredients.push(ingredientGroup.get('text').value);
    }

    this.shoppingService.updateIngredients(newIngredients);
  }

  updateIngredient(index: number) {
    // pretty convoluted to get the value on the text in input array
    const updatedIngredient: string = (<FormArray>this.ingForm.get('ingredients')).controls[index].get('text').value;
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
