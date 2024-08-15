import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive(
  {
    selector: '[appBasicHighlight]',
  }
)
export class BasicHighlightDirective implements OnInit{

  constructor(private ref: ElementRef) {
  }

  ngOnInit(): void {
        this.ref.nativeElement.style.backgroundColor = 'Green';
    }

}
