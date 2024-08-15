import {AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlighter]'
})
export class BetterHighlighterDirective implements OnInit {

  @Input('defaultColor') defaultColor: string = "transparent";
  @Input('highlightColor') color: string = "red";

  // If you use this, then the directive name can be used to bind to a value like <p [appBetterHighlighter]='green'>
  // @Input('appBetterHighlighter') highlightColor: string = "green";

  @HostBinding('style.backgroundColor') backgroundColor: string ;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
        // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue")
        this.backgroundColor = this.defaultColor
    }

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue")
    this.backgroundColor = this.color
  }
  @HostListener('mouseleave') mouseLeave() {
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "transparent")
    this.backgroundColor = this.defaultColor
  }

}
