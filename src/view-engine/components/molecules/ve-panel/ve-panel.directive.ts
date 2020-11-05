import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[vePanel]",
})
export class ViewEnginePanelDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
