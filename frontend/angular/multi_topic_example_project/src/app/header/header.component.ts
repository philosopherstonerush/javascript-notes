import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output("navigate") navigate = new EventEmitter<string>();

  navigateTo(option: string) {

    if (option === "recipes") {
      this.navigate.emit("recipes")
    }

    if(option === 'shoppinglist') {
      this.navigate.emit("shoppinglist")
    }

  }
}
