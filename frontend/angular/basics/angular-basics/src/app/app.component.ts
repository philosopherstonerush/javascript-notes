import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SuvarnaComponent } from './section_2_the_basics/suvarna/suvarna.component';
import { SuvarnasComponent } from './section_2_the_basics/suvarnas/suvarnas.component';
import { TwoWayDataComponent } from './section_2_the_basics/two-way-data/two-way-data.component';
import { AssignmentComponent } from './section_2_the_basics/directives-practice-assignment/assignment.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SuvarnasComponent, SuvarnasComponent, TwoWayDataComponent, AssignmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-basics';
}
