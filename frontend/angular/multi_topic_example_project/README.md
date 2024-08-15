# Notes for this seciton

## property binding with src

```angular2html

<img
  [src]="recipe.imagePath"
  [alt]="recipe.name"
  class="img-responsive"
  style="max-height: 50px;"
>

or
<img
  src="{{ recipe.imagePath }}" 
  alt="{{ recipe.name }}"
  class="img-responsive"
  style="max-height: 50px;"
>


```

No need to have curly braces as the property binding is used. 

# Hostbinding

This can be used to bind with a class, style, property etc

```

// this binds to the class box1, since its false, box1 wont be included in the class list of the element that this directive is in.

@HostBinding('class.box1') toggle: boolean = false;

// you can define a host listener to change this value

```

Sometimes this doesnt seem to work, an alternative - heavy work way would be to 

```angular2html

if(this.element.nativeElement.classList.contains('open')) {
  this.renderer.removeClass(this.element.nativeElement, 'open')
} else {
  this.renderer.addClass(this.element.nativeElement, 'open')
}

```

# HostListener 

it defines the DOM event to listen for and also specifies a function to run when the event occurs.

```angular2html

@HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
  }

// ['$event.target'] is just extra parameter that gets passed into the the function when the event is observed 
// this could just be $event 


```

