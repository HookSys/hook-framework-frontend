import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[viewEngineSchematicsHost]' })
export class ViewEngineSchematicsHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
