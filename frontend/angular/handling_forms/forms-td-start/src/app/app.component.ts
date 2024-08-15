import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("f") form : NgForm;
  defaultUsername: string = "super star suvarna"
  answer: string = "";

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.form.patchValue({
    //   userData: {
    //     username: suggestedName
    //   }
    // })

    this.form.form.setValue({
      userData: {
        username: suggestedName,
        mail: ''
      },
      secret: '',
    })
  }

  onSubmit(f: NgForm) {
      console.log(f)
  }


  // onSubmit() {
  //   console.log(this.form)
  // }

}
