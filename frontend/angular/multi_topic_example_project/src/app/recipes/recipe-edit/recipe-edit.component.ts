import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

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
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
          (params: Params) => {
            this.id = +params["id"]
            this.initForm()
          }
        )
      this.route.queryParams.subscribe(
        (params: Params) => {
          this.editMode = params["editMode"] != null;
          this.initForm();
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
              "name": new FormControl(ingredient.name),
              "amount": new FormControl(ingredient.amount)
            }))
          }
        }
      }

      console.log(ingredientsArray);
      this.recipeForm = new FormGroup({
        "name": new FormControl(recipeName),
        "description": new FormControl(recipeDescription),
        "image": new FormControl(recipeImagePath),
        "ingredients": ingredientsArray
      })

    }

    onSubmit() {
      console.log(this.recipeForm);
    }

    get controls() {
      let controlsLog = (<FormArray>this.recipeForm.get('ingredients')).controls;
      for(let control of controlsLog) {
        console.dir(control.name)
      }
      return controlsLog
    }

}
