import {Component, Input} from '@angular/core';
import { RecipeModel } from '../recipe.model';
import {RecipeService} from "../recipe.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input("recipe") recipe: RecipeModel;
  id: number;

  constructor(private recipeService: RecipeService, private shoppingList: ShoppingListService, private route: ActivatedRoute) {
    recipeService.recipeSelected.subscribe((recipe: RecipeModel) => {
      console.log("event is emitted properly")
      console.log(recipe.name)
      this.recipe = recipe;
    })

    route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipes().at(+params.id)
        this.id = +params.id;
      }
    )

  }

  addIngredientsToShoppingList() {
    this.shoppingList.addAllIngredients(this.recipe.ingredients)
  }
}
