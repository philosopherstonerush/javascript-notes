import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  selectedRecipe: RecipeModel;

  constructor(private rec: RecipeService) {
    this.selectedRecipe = this.rec.getRecipes().pop()
  }

  ngOnInit(): void {
        this.rec.recipeSelected.subscribe((recipe: RecipeModel) => {
           this.selectedRecipe = recipe;
        })
    }

}
