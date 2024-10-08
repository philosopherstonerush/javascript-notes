import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input('appUnless') set appUnless(appUnless: boolean) {
      if(!appUnless) {
        this.vcRef.createEmbeddedView(this.templateRef)
      } else {
        this.vcRef.clear()
      }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef:ViewContainerRef) { }

}
