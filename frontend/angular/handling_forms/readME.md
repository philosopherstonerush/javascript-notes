
# Forms

Two types - Template Driven (easy to start, low flexibility, angular infers from HTML) and Reactive form (HTML and Typescript binding must be specified by dev, leading to greater flexibility)

## Template Driven Forms

### Submitting and Accessing the submitted form

#### Passing form as a reference

```html
<form (ngSubmit)="onSubmit(f)" #f="ngForm"> <!--  <---- IMPORTANT -->
    <div id="user-data">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control"
                   ngModel
                   name="username"
            >
        </div>
        <button class="btn btn-default" type="button">Suggest an Username</button>
        <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control" ngModel
                   name="email">
        </div>
    </div>
    <div class="form-group">
        <label for="secret">Secret Questions</label>
        <select id="secret" class="form-control"
                ngModel
                name="secret">
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
        </select>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
</form>

```

```typescript

onSubmit(f: NgForm) {
    console.log(f)
}

```

-- Two attributes are important for every input field, their name and also ngModel. 
-- To get access to the submitted form, make a element reference, in the above example it is #f and set it equal to `ngForm` which provides access to the form instance that angular creates based off the above html template.
-- Listen to the ngSubmit event provided by Angular, send in the element ref

### Accessing data in the submitted form:

```typescript

this.form.value.username [or whatever name that we gave the control here]

```

#### Using a viewChild

```typescript
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild("f") form : NgForm;
    
    suggestUserName() {
        const suggestedName = 'Superuser';
    }

    protected readonly onsubmit = onsubmit;

    onSubmit() {
        console.log(this.form)
    }

}
```

While f is the reference created on HTML like this

```HTML

<form (ngSubmit)="onSubmit()" #f="ngForm">

```

##### setValue and patchValue

```typescript

// only changes the value in the input for the tag which has that name
this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
    
// sets the default value to the ngform
this.form.form.setValue({
    userData: {
        username: suggestedName,
        mail: ''
    },
    secret: '',
})

//

```

#### prevent submission if the form is invalid:

If the form is invalid, then angular introduces some classes to it and they are `ng-touched` and `ng-invalid`

`ngForm` instance reference also has properties that can be used to access validity of the form

```HTML

<!--     f being the ngForm reference        -->

<button class="btn btn-primary" type="submit" [disabled]="f.valid">Submit</button>

```

### Validation

Using template drive approach to forms, theres not much to do than use the angular's validation directives. 

https://angular.dev/api/forms/Validators?tab=api

#### Access to individual input tags

```angular17html

<form>
    ...

    <label for="email">Mail</label>
    <input type="email" id="email" class="form-control" ngModel
           name="email" email #email="ngModel">
    <span *ngIf="!email.valid && email.touched">
              Please enter a valid email
    </span>
    
    ...
</form>

```

we can access the angular's directive by using local reference and matching it with ngModel, this way we will get access to the properties of the current form control input.

if the user has touched the email input and then moved away then email.touched will be true.

css classes are also dynamically added to these input tags depending on whether they are valid are not 

```css

input.ng-invalid {

    border: 1px, red;

}

```

forms can also have a overall css class that represents its status

### Default values for input tags

Through one-way data binding, we can bind ngModel to a field that has the default value for the respective input tag

```angular17html

<label for="username">Username</label>
<input type="text" id="username" class="form-control"
       [ngModel] = "defaultUsername"
       name="username"
>

```

```typescript

defaultUsername: string = "super star suvarna"

```

### Binding data to a variable in the class

Use two way binding to bind data from input to the class, One way to have a default value that is from class to html.

```angular17html

<textarea rows="4" cols="100" class="textarea" [(ngModel)]="answer" name="answer">

          </textarea>
<span>This: {{ answer }}</span>

```

### Bind a sub part of a form to a key

```angular17html

<div
        id="user-data"
        ngModelGroup="userData"
        #userData="ngModelGroup"
>
    // username
    // email
</div>

```

If we were to log this, then we can access, `form.userData.valid` etc properties

### Resetting a form

this also refreshes the css classes that were assigned previously to the controls indicating the validity status, setValue only changes the binded values.

```typescript

this.form.reset()

```

## Reactive Forms

NOTE: MAKE SURE TO IMPORT ReactiveFormsModule

### Initializing:

- implement onInit hook, because reactive forms always have to initialized by the component

```typescript

ngOnInit() {
    this.form = new FormGroup({
        "username": new FormControl(null), // default value
        "email": new FormControl(null),
        "gender": new FormControl('male'),
    })
}

```

### Synchronous Validation

- You cannot add validators to the template directly but rather use it within the form init 

```typescript

ngOnInit() {
    this.form = new FormGroup({
        "username": new FormControl(null, [Validators.required]),
        "email": new FormControl(null, [Validators.required, Validators.email]),
        "gender": new FormControl('male'),
    })
}

```

### Getting Access to Form Controls:

#### Traversing through the path:

```typescript

this.form = new FormGroup({
    "username": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "gender": new FormControl('male'),
})


signupForm.get('username').valid // etc can be accessed

```

### Grouping form tags

```typescript
import {FormGroup} from "@angular/forms";

this.form = new FormGroup({
    "username": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "gender": new FormControl('male'),
})

// this can be changed to:

this.form = new FormGroup({
    "userData": new FormGroup({
        "username": new FormControl(null, [Validators.required]),
        "email": new FormControl(null, [Validators.required, Validators.email]),
    }),
    "gender": new FormControl('male'),
})

// to access the data in the HTML form

form.get('userData.username').valid // etc as we have access to form control

```

This helps to categorize the form into manageable chunks. 

### FormArray

- This helps you to dynamically aggregate form controls

Given:

```typescript

this.form = new FormGroup({
    "userData": new FormGroup({
        "username": new FormControl(null, [Validators.required]),
        "email": new FormControl(null, [Validators.required, Validators.email]),
    }),
    "gender": new FormControl('male'),
    "hobbies": new FormArray([])
})

```

You can add hobbies: (through button)

```typescript

onHobbyAdd() {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.form.get('hobbies')).push(control)
}

```

And display them like this

```typescript

<div class="form-control"
*ngFor="let formControl of getControls(); let i = index"
>
<input type="text" formControlName="i">
</div>

// geControls is accessed like this.
getControls() {
    return (<FormArray>this.form.get('hobbies')).controls;
}

```

NOTE: COMPLEX EXAMPLE - I spent too much time debugging this

- The gist is you cant use [formControlName] with the [] on it, the right way is to just say `formControlName='<whatever>'`

```angular17html

<div class="col-xs-12" formArrayName="ingredients">
    <div
            class="row"
            *ngFor="let ingredient of controls; let i = index"
<!--            GROUP CAN HAVE THE []           -->
            [formGroupName]="i"
    >
        <div class="col-xs-8">
            <input type="text"
                   class="form-control"
                   formControlName="name"
            >
        </div>
        <div class="col-xs-2">
            <input class="form-control"
                   type="number"
                   formControlName="amount">
        </div>
        <div class="col-xs-2">
            <button class="btn btn-danger">X</button>
        </div>
    </div>
</div>

```




### Custom validators:

```typescript

ngOnInit() {
    this.form = new FormGroup({
        "userData": new FormGroup({
            
            // forbiddenNames is a custom validator, you need to bind this to it because then angular (who is calling the validator) wont be able to access the variables that this controller instance has.
            
            "username": new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
            "email": new FormControl(null, [Validators.required, Validators.email]),
        }),
        "gender": new FormControl('male'),
        "hobbies": new FormArray([])
    })
}

// custom validators are written as

forbiddenNames(formControl: FormControl): {[s: string]: boolean} {
    if(this.forbiddenNamesList.indexOf(formControl.value) !== -1) {
        return {'forbiddenNames': true};
    }
    return null;
}


```

- You need to return a custom dict with key as the error code and then boolean, if theres not error then null can be returned.

#### How to check for these custom error codes?

```angular17html

<span *ngIf="form.get('userData').get('username').errors != null 
        && form.get('userData').get('username').errors['forbiddenNames'] 
        && form.get('userData').get('username').touched">
    Invalid name
</span>

```

- check for null to not be troubled by it since we also return null if the error is not present
- then since its a normal dict you can just query for the error code.

### Asynchronous validators

- If you want to perform a task that would take a bit of time to perform, suppose validating through a web request then you async array.

```angular17html

// first arg is the default value of the control
// second arg is the synchronous validators
// third arg is the asynchronous validators

this.form = new FormGroup({
...
"email": new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails]),
}),
...
})

```

To implement async validators 

```angular17html

return new Promise<any>((resolve, reject) => {
  setTimeout(() => {
    if (formControl.value === "test@test.com") {
      resolve({'forbiddenEmail': true});
    }
    return resolve(null);
  }, 1500)
});

```



### Observables

```angular17html

// It sends a copy of the form to you whenever the form value changes.
this.form.valueChanges.subscribe(
  (value) => console.log(value)
)

// It sends the current status of the form whenever the validity changes.
this.form.statusChanges.subscribe(
  (status) => console.log(status)
)

```

### setValues and patchValues

```angular17html

// sets all the values for the form.

this.form.setValue({
  "userData": {
    "username": "suvarna",
    "email": "suvarna@gmail.com",
  },
  "gender": "male",
  "hobbies": []
})

// updates only a part of the form.

this.form.patchValue({
  "userData": {
    "username": "suvarna007",
  }
})

```