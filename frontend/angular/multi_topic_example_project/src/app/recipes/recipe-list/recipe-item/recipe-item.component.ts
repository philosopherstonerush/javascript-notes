import {Component, Input} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {RecipeModel} from "../../recipe.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input('recipe') recipe: RecipeModel;
  @Input('id') id: number;
  constructor(private recipeService: RecipeService) {
  }

  onSelected() {
    console.log(this.recipe)
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}
