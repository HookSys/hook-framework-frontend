import { ViewEngineSchematicsHostDirective } from './ve-schematics.directive';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentFactory, ComponentRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ViewEngineSchematicsPanelComponent } from './factories/ve-schematic-ve-panel.factory';
import { ViewEngineSchematicsDbPanelComponent } from './factories/ve-schematic-ve-dbpanel.factory';

@Component({
  selector: 've-schematics',
  templateUrl: './ve-schematics.component.html',
  styleUrls: ['./ve-schematics.component.scss'],
})
export class ViewEngineSchematicsComponent implements OnInit, AfterViewInit {
  @ViewChild(ViewEngineSchematicsHostDirective, { static: true })
  schematicHost: ViewEngineSchematicsHostDirective;

  @Input()
  schematic: SchematicObjectWithRelations;

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.schematic)

    switch(this.schematic.type) {
      case 'PANEL':
      case 'FUNCTION':
        this.buildPanel();
        break;
      case 'DBPANEL':
        this.buildDbPanel();
        break;
    }

    this.cdRef.detectChanges();
  }

  buildDbPanel() {
    const viewContainerRef = this.schematicHost.viewContainerRef;
    viewContainerRef.clear();
    const factory: ComponentFactory<ViewEngineSchematicsDbPanelComponent>
      = this.resolver.resolveComponentFactory(ViewEngineSchematicsDbPanelComponent);

    const componentRef: ComponentRef<ViewEngineSchematicsDbPanelComponent>
      = viewContainerRef.createComponent(factory);
      componentRef.instance.schematicId = this.schematic.id;
  }

  buildPanel() {
    const viewContainerRef = this.schematicHost.viewContainerRef;
    viewContainerRef.clear();
    const factory: ComponentFactory<ViewEngineSchematicsPanelComponent>
      = this.resolver.resolveComponentFactory(ViewEngineSchematicsPanelComponent);

    const componentRef: ComponentRef<ViewEngineSchematicsPanelComponent>
      = viewContainerRef.createComponent(factory);
      componentRef.instance.schematicId = this.schematic.childs[0].id;
  }

}
