import { ViewEngineSchematicsHostDirective } from './ve-schematics.directive';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, ComponentFactory, ComponentRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ViewEngineSchematicsPanelComponent } from './factories/ve-schematic-ve-panel.factory';

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
      if (['PANEL', 'FUNCTION'].includes(this.schematic.type))
        this.buildPanel();
      this.cdRef.detectChanges();
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
