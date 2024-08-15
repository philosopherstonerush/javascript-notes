import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/Ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  onEditingSubject = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 10)
  ];

  constructor() {

  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  getIngredient(index): Ingredient {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addAllIngredients(ingredients: Ingredient[]) {
    this.ingredients = this.ingredients.concat(ingredients)
    console.log(this.ingredients)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice())
  }

  removeIngredient(editedItemIndex: number) {
    this.ingredients.splice(editedItemIndex, 1);
    console.log(this.ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
