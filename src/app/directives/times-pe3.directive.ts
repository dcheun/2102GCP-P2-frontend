import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appTimesPE3]',
})
export class TimesPE3Directive {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input('appTimesPE3') set render(times: number) {
    this.viewContainerRef.clear();

    for (let i = 0; i < times; i += 3) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        index: i,
      });
    }
  }
}
