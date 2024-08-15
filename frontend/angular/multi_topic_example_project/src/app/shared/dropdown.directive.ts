import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropDown]',
})
export class DropdownDirective {


  constructor(private element: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('click') onClick() {
      if(this.element.nativeElement.classList.contains('open')) {
        this.renderer.removeClass(this.element.nativeElement, 'open')
      } else {
        this.renderer.addClass(this.element.nativeElement, 'open')
      }
   }


}
