import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'assignment',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './assignment.component.html',
    styles: "node_modules/bootstrap/dist/css/bootstrap.min.css"
})
export class AssignmentComponent {

    allowParagraph: boolean = true;

    loggerArray: string[] = [];

    color = 'blue'

    changeParagraphOpacity() {
        
        this.allowParagraph = (this.allowParagraph == true) ? false: true;
        
        this.loggerArray.push(new Date().toLocaleString() + " - " + this.allowParagraph);

    }

}