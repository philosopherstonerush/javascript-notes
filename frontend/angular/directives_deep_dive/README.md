
Directives are of two types
  - Attribute directives
    - Looks like a normal html attribute - with databinding and event binding
    - only affects or changes the element that it is added to
  - Structural directives
    - Looks like a HTML attribute but has a leading *
    - affects a whole area of the DOM (element gets added or removed)


# Creating a new Directive

## Attribute directive

1) Import the directive annotation from angular/core
2) define a directive class with a filename as 'basic-highlight.directive.ts'

```typescript


@Directive(
  {
    selector: '[appBasicHighlight]', // NOTE: This tells the angular engine to select HTML with appBasicHighlight mentioned as an attribute (not [appBasicHighlight])
  }
)
export class BasicHighlightDirective implements OnInit{

  // NOTE: By defining this as a private argument, you get access to the element that it was used on, the value gets automatically binded
  constructor(private ref: ElementRef) { 
  }

  ngOnInit(): void {
    this.ref.nativeElement.style.backgroundColor = 'Green';
  }

}

```

NOTE: Make sure to add your custom component to your app.module file.

Directly accessing DOM with native element is a BAD practice, use renderer instead, the same logic can be replaced with

```typescript

@Directive({
  selector: '[appBetterHighlighter]'
})
export class BetterHighlighterDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    
    // CAREFUL: this.elRef.nativeElement has to be passed
    this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue")
  }

}

```

# Generate directive files through CLI:

```typescript
ng generate directive <name-of-directive>

or 

ng g d <name-of-directive>

```

# Listening to event as a Directive:

Use `@HostListener` which takes an event name as input and then triggers the accompanying method

```typescript

@HostListener('mouseenter') mouseEnter(eventData: Event) {
  this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue")
}

```

mouseEnter is the method that gets triggered when mouse enters the HTML element that has the relevant directive.

Or directly bind to any property within the element that you are placing your custom directive in using `@HostBinding`

```typescript
import {HostBinding} from "@angular/core";

@HostBinding('style.backgroundColor') backgroundC : string = "transparent";

@HostListener('mouseenter') mouseEnter(eventData: Event) {
  this.backgroundColor = "blue"
}
@HostListener('mouseleave') mouseLeave() {
  this.backgroundColor = "transparent"
}

```

# Taking input for your custom directive:

```typescript
// appBetterHighlighter
@Input('defaultColor') defaultColor: string = "transparent";
@Input('highlightColor') color: string = "red";

// HTML
<p appBetterHighlighter [defaultColor]="'red'" [highlightColor]="'green'" >
  this is from appBetterHighlighter
</p>

```

defaultColor and highlightColor as property binded to strings red and green. It is important we represent string in single quotes. 

If only string is passed to the directive

```typescript
<p appBetterHighlighter defaultColor="red" highlightColor="green" >
  this is from appBetterHighlighter
</p>
```

we can drop the square brackets and the single quotes

If your custom directive takes one input then you can take that input as a part of your directive's name like 

```typescript

@Input('appBetterHighlighter') highlightColor: string = "green";

<p [appBetterHighlighter]="red">
  this is from appBetterHighlighter
</p>

```

# Creating custom structural directives:

```typescript

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  
  // set defines a setter method that typescript provides, this method is called whenever the HTML element that it is on, has its property value changed that this structural directive binded to.
  @Input('appUnless') set appUnless(appUnless: boolean) {
    if(!appUnless) {
      this.vcRef.createEmbeddedView(this.templateRef) // 2
    } else {
      this.vcRef.clear() // 3
    }
  }
  
  // TemplateRef gives access to ng-template.
  // ViewContainerRef ---> https://angularindepth.com/posts/1052/exploring-angular-dom-manipulation-techniques-using-viewcontainerref
  constructor(private templateRef: TemplateRef<any>, private vcRef:ViewContainerRef) { }

}

```

A really cool blog post regarding different DOM manipulation techniques is stored in obsidian read everyday.

# ngSwitch - new structural Directive

```angular2html

<div [ngSwitch]="value">
  <p *ngSwitchCase="10"> this is a 10 </p>
  <p *ngSwitchCase="5"> this is a 5 </p>
  <p *ngSwitchDefault> this is a default case </p>
</div>

```

This is like a normal switch logic and it binds to a property and then you can use * structural idiom to conditionally render subparts based on its value.
