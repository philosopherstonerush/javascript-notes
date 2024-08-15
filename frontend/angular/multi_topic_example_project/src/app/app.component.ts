import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showRecipes = false;

  handleNavigation(event) {

    if(event === "recipes") {
      this.showRecipes = true;
    } else {
      this.showRecipes = false;
    }

  }
}
