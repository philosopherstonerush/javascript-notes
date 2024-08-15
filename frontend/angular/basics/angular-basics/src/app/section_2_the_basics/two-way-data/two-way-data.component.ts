import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './two-way-data.component.html',
  styleUrl: './two-way-data.component.css'
})
export class TwoWayDataComponent {
  username: string = ""
  allowButton: boolean = false
  saved: boolean = false

  checkifcanallow(event: any) {
      if (this.username != "") {
        this.allowButton = true
      } else {
        this.allowButton = false
      }
  }

  reset() {
    this.username = ""
    this.allowButton = false
    this.saved = true
  }

}
