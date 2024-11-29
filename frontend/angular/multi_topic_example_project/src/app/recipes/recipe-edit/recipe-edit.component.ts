import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/Ingredient";
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

    id: number;
    editMode: boolean = false;
    recipeForm: FormGroup;


    constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
          (params: Params) => {
            this.id = +params["id"]
            this.editMode = params["id"] != null
            this.initForm()
          }
        )
    }

    private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let ingredientsArray = new FormArray([]);

      if(this.editMode) {
        let recipeModel = this.recipeService.getRecipe(this.id);
        recipeName = recipeModel.name;
        recipeImagePath = recipeModel.imagePath;
        recipeDescription = recipeModel.description;
        if(recipeModel["ingredients"]) {
          console.log(recipeModel["ingredients"])
          for(let ingredient of recipeModel.ingredients) {
            ingredientsArray.push(new FormGroup({
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(ingredient.amount, [
                Validators.required,
              ])
            }))
          }
        }
      }

      console.log(ingredientsArray);
      this.recipeForm = new FormGroup({
        "name": new FormControl(recipeName, Validators.required,),
        "description": new FormControl(recipeDescription, Validators.required,),
        "image": new FormControl(recipeImagePath, Validators.required,),
        "ingredients": ingredientsArray
      })

    }

    onSubmit(event) {
      let recipe: RecipeModel = new RecipeModel(
        this.recipeForm.value.name,
        this.recipeForm.value.description,
        this.recipeForm.value.image,
        this.recipeForm.value.ingredients,
      )
      if(this.editMode) {
        this.recipeService.updateRecipe(this.id, recipe);
      } else {
        this.recipeService.addRecipe(recipe);
      }
      this.router.navigate(['recipes', this.id]);

    }

    get controls() {
      let controlsLog = (<FormArray>this.recipeForm.get('ingredients')).controls;
      return controlsLog
    }

  protected readonly JSON = JSON;

  onIngredientAdd() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required,),
        "amount": new FormControl(null, Validators.required,),
      })
    )
  }

  onCancel() {
    this.router.navigate(['recipes', this.id]);
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i)
  }
}
