import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  OddNumberArr = []
  EvenNumberArr = []

  digitEventHandler(event: number) {
      if(event % 2 != 0) {
        this.OddNumberArr.push(event)
      } else {
        this.EvenNumberArr.push(event)
      }
  }
}
