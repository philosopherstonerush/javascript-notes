import {Ingredient} from "../shared/Ingredient";


export class RecipeModel {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

  getName() {
    return this.name;
  }

}
