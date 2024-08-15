import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/Ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[];
  shoppingListSubscription: Subscription;

  constructor(private ingredientsService: ShoppingListService) {
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.ingredientsService.getIngredients()
    this.shoppingListSubscription = this.ingredientsService.ingredientChanged.subscribe(
      (ingredient ) => this.ingredients = ingredient
    )
  }

  onNewIngredientAdded(ingredient: Ingredient) {
    this.ingredientsService.addIngredient(ingredient);
  }

  onEditItem(i: number) {
    this.ingredientsService.onEditingSubject.next(i);
  }
}
