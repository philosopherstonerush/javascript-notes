# Angular Versioning 

Angular Devs have a clear schedule to release a new version of angular framework every 6 months.

Angular 1 aka AngularJs - the very first version of angular that got released. Fundamental flaws were found in it and so the devs made significant changes.

Angular 2/2+ aka Angular - the mainstream angular version that is used today. 

# How to set up the project

1) Install angular CLI tool

2) creating

```

ng new <app-name>

```

3) Compiling and rendering it on browser

```

ng serve

```

# How to add css packages to angular?

Under `angular.json` file find `styles` key in which you can add the path of the package you want

```
"styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ]
```

# Basic working

- Server sends `index.html` and it has the custom element `<app-root>` which the angular senses and replaces with our own logic. 
- The components that angular needs to be aware of the start of receival of page is determined under `app.config.ts`

# Components

![components](notes/image.png)

They provider fine grain control over the content that gets displayed on the web page.

Custom components are nested from `<app-root>`

NOTE: Whenever you edit a component make sure to include it in the root of the html ---> ex: app-root for this project

## Creating a new component

- create a component file with any name, `suvarna.component.ts` for example.
-  import `Component` annotation from `angular/core`
- Pass a javascript object to the @Component annotation with properties that defines the behavior of the component.
  - Standalone -> You don't need a @NgModule component to bind all the components together. @NgModule is present in legacy angular code.
  - selector -> What html component should angular match to? `<suvarna>` - it doesnt have to be an element, it could be a class (.<class_name>), attribute (defined between square brackets) etc BUT id is not supported by angular
  - templateUrl -> The html file relative path.

Good practices:
- make every new component to have each of its own folder

### Generating the component with CLI:

```
ng generate component <component_name>

ng g c <component_name>
```

## Using component

- Add your component to the angular `app-component` as a member to `imports` 
- This is how you nest one component in another.

## template vs templateUrls & styles vs styleUrls

If your code is pretty much less than three lines then you can just type it out on annotation itself. 

```typescript
\\ backticks are used because they preserve wrap or else you would have to write it all out in a single line

template: `<app-server></app-server><app-server></app-server>`

without having to link it to an external html file

Same is true with css, but its an array

styles: [`h3 {
  something
}`]

```

# Data binding

## String interpolation

```
{{ data }}
```
NOTE
- the data has to be able to be converted into a string at the end - it can be even a method but eventually it must return a string

## Property Binding

It lets you to bind the class variables to the attributes found in your html

```json

export class SuvarnasComponent {

  allowNewDup = true;

  constructor() {
    setTimeout(()=> {this.allowNewDup = false}, 2000)
  }
}

<button class="btn btn-primary" [disabled] = "allowNewDup">
    Allow
</button>

```

## Event Binding

there are many events that a logic could be binded to, to be executed when those events happen.

NOTE: Events must be in parenthesis

```

onClickOnButton() {
    alert("you clicked a button")
}

<button class="btn btn-primary" [disabled] = "allowNewDup" (click)="onClickOnButton()">
    Allow
</button>

```

### $event parameter

$event is a reserve keyword that can be passed as a parameter to event logic methods that can be analysed to be relevant info about event that occured

```

<input type="text" (input) = "onInputForName($event)">

<p> You entered {{ name }}</p>

```

## Combining Event binding and Property binding (Two way data-binding):

- Use ngModel to bind to events and update the binded property value automatically
- Make sure to import formModule to enable two way data binding
- it is uses both `[]` and `()`

```
// size is two way data binded
<app-sizer [(size)]="fontSizePx"></app-sizer>

```

# Directives:

Directives are instructions found in the DOM.

'components' are in fact one type of a directive.

But there are some other in-built functions like `*ngIf`
the * is important because it defines that it is a structural directive

## ngIf - conditional statement for html rendering

syntax:

```

// short hand form
<div *ngIf="condition">Content to render when condition is true.</div>

// when expanded: 
<ng-template [ngIf]="condition"><div>Content to render when condition is
true.</div></ng-template>

Simple form with expanded syntax:
<ng-template [ngIf]="condition"><div>Content to render when condition is
true.</div></ng-template>

Form with an "else" block:
<div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>

Shorthand form with "then" and "else" blocks:
<div *ngIf="condition; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>Content to render when condition is true.</ng-template>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>

```

### ng-templae

Angular's <ng-template> element defines a template that is not rendered by default.

With <ng-template>, you can define template content that is only being rendered by Angular when you, whether directly or indirectly, specifically instruct it to do so, allowing you to have full control over how and when the content is displayed.

Note that if you wrap content inside an <ng-template> without instructing Angular to render it, such content will not appear on a page. For example, see the following HTML code, when handling it Angular won't render the middle "Hip!" in the phrase "Hip! Hip! Hooray!" because of the surrounding <ng-template>.

```
content_copy
<p>Hip!</p>
<ng-template>
  <p>Hip!</p>
</ng-template>
<p>Hooray!</p>
```

### ngStyle

This is an in built directive that is use to return custom style code

```

Set the font of the containing element to the result of an expression.
<some-element [ngStyle]="{'font-style': styleExp}">...</some-element>

Set the width of the containing element to a pixel value returned by an expression.
<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>

Set a collection of style values using an expression that returns key-value pairs.
<some-element [ngStyle]="objExp">...</some-element>

```

### ngClass

https://angular.io/api/common/NgClass#description

```typescript

<some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>

// Here the class1 class2 and class3 are only applied when a condition is evaluated to true.

<li *ngFor="let num of numbers" 
    [ngClass] = "{btn btn-primary: num % 2 == 0}"
        > </li>

// Here the button only gets the CSS classes applied if the num is even

```