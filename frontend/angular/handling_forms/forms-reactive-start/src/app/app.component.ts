import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  form: FormGroup;
  forbiddenNamesList = ["suvarna", "sanjiiv"];

  ngOnInit() {
    this.form = new FormGroup({
     "userData": new FormGroup({
       "username": new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
       "email": new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails]),
        }),
      "gender": new FormControl('male'),
      "hobbies": new FormArray([])
    })

    this.form.valueChanges.subscribe(
      (value) => console.log(value)
    )

    this.form.statusChanges.subscribe(
      (status) => console.log(status)
    )

    this.form.setValue({
      "userData": {
        "username": "suvarna",
        "email": "suvarna@gmail.com",
      },
      "gender": "male",
      "hobbies": []
    })

    this.form.patchValue({
      "userData": {
        "username": "suvarna007",
      }
    })

  }

  onHobbyAdd() {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.form.get('hobbies')).push(control)
  }

  getControls() {
    return (<FormArray>this.form.get('hobbies')).controls;
  }

  // Custom Validator

  forbiddenNames(formControl: FormControl): {[s: string]: boolean} {
    if(this.forbiddenNamesList.indexOf(formControl.value) !== -1) {
      return {'forbiddenNames': true};
    }
    return null;
  }

  onSubmit() {
    console.log(this.form)
  }

  forbiddenEmails(formControl: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === "test@test.com") {
          resolve({'forbiddenEmail': true});
        }
        return resolve(null);
      }, 1500)
    });
  }

}
