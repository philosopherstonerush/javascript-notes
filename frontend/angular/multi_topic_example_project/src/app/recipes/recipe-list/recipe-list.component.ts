import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{

    recipes: RecipeModel[] = []

    constructor(private recipeService: RecipeService) {
    }

    ngOnInit(): void {

      this.recipes = this.recipeService.getRecipes();
      console.log(this.recipes)
      this.recipeService.recipesChanged.subscribe((res: RecipeModel[]) => {
        this.recipes = res;
      })

    }

}
