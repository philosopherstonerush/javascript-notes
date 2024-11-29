import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/Ingredient";
import {ShoppingListService} from "../shopping-list.service";
import {Form, FormGroup, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnDestroy {

  @ViewChild('f') form: FormGroup;
  editSubscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number ;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
    this.editSubscription = this.shoppingListService.onEditingSubject.subscribe((num: number) => {
      this.editMode = true;
      this.editedItemIndex = num;
      this.editedItem = this.shoppingListService.getIngredient(num);
      this.form.setValue({
        "name": this.editedItem.name,
        "amount": this.editedItem.amount,
      })
    })
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  onAdd(f: NgForm) {
    const value = f.value
    console.log(value)
    let ingredient = new Ingredient(value.name, value.amount)
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient)
    }
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    if(this.editMode) {
      console.log("deleted item" + this.editedItemIndex);
      this.shoppingListService.removeIngredient(this.editedItemIndex);
    }
  }
}
