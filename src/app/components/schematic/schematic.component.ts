import { Component, Input, ElementRef, AfterViewInit, ComponentFactoryResolver,
    Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { Feature } from '../../models';
import { PanelComponent } from '../panel/panel.component';
import { EditPanelComponent } from '../../modules/edit-panel/edit-panel.component';

@Component({
  selector: 'app-schematics',
  templateUrl: './schematic.component.html',
  styleUrls: ['./schematic.component.scss'],
})
export class SchematicComponent implements AfterViewInit {
  @Input()
  code: number;

  constructor(private elementRef: ElementRef,
              private injector: Injector,
              private appRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector('#app-schematic');
      if (this.code === 1000) {
        const panelComponent = this.componentFactoryResolver.resolveComponentFactory(PanelComponent).create(this.injector);
        this.appRef.attachView(panelComponent.hostView);
        const domElem = (panelComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        element.appendChild(domElem);
        panelComponent.instance.dto = {
          code: this.code,
          size: 1,
          child: [1001],
        };
      } else if (this.code === 1001) {
        const dbPanelComponent = this.componentFactoryResolver.resolveComponentFactory(EditPanelComponent).create(this.injector);
        this.appRef.attachView(dbPanelComponent.hostView);
        const domElem = (dbPanelComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        element.appendChild(domElem);
        dbPanelComponent.instance.code = 91;
      } else if (this.code === 1002) {
        const dbPanelComponent = this.componentFactoryResolver.resolveComponentFactory(EditPanelComponent).create(this.injector);
        this.appRef.attachView(dbPanelComponent.hostView);
        const domElem = (dbPanelComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        element.appendChild(domElem);
        dbPanelComponent.instance.code = 92;
      }
    });
  }
}
