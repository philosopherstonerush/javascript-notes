import { Component } from '@angular/core';
import { SuvarnaComponent } from '../suvarna/suvarna.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-suvarnas',
  standalone: true,
  imports: [SuvarnaComponent, FormsModule],
  templateUrl: './suvarnas.component.html',
  styleUrl: './suvarnas.component.css'
})
export class SuvarnasComponent {

  allowNewDup = true;
  name = '';

  constructor() {
    setTimeout(()=> {this.allowNewDup = false}, 2000)
  }

  onClickOnButton() {
    alert("you clicked a button")
  }

  onInputForName(event: any) {
    this.name = event.target.value;
  }
}
