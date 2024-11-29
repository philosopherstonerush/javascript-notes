import {EventEmitter, Injectable} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {Ingredient} from "../shared/Ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<RecipeModel>();
  recipesChanged: Subject<RecipeModel[]> = new Subject<RecipeModel[]>();


  private recipes: RecipeModel[] = [
    new RecipeModel('some dish',
      'domse',
      'https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_960_720.jpg',
      [
        new Ingredient("Meat", 100),
        new Ingredient("leaf", 1000)
      ]
      ),
    new RecipeModel("some other dish",
      "fuck you",
      "https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_960_720.jpg",
      [
        new Ingredient("Meat", 100),
        new Ingredient("leaf2", 1000)
      ]

    )
  ]

  constructor() { }


  getRecipes() {

    // This would return the reference to the array which means anyone can alter the content inside the array
    // return this.recipes;

    // Return a copy with
    return this.recipes.slice();

  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: RecipeModel) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  deleteRecipe(index: number) {
    let recipes_before = this.recipes.slice(0, index);
    let recipes_after = this.recipes.slice(index + 1);
    this.recipes = recipes_before.concat(recipes_after);
    this.recipesChanged.next(this.recipes.slice());
  }
}
