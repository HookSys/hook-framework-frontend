import { ViewEnginePanelComponent } from '../../../molecules/ve-panel/ve-panel.component';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ɵConsole } from '@angular/core';
import { SchematicObject } from 'models/schematic-object';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { SchematicObjectControllerService } from '../../../../api/services/schematic-object-controller.service';
import { ViewEnginePanelDirective } from '../../../molecules/ve-panel/ve-panel.directive';
import { FilterBuilder } from 'view-engine/api/query';

const filter = new FilterBuilder<SchematicObjectWithRelations>({
  include: [{
    relation: 'childs'
  }]
}).build();

@Component({
  selector: 've-schematics-ve-panel',
  template: `<ve-panel *ngIf="schematic" [schematic]="schematic"></ve-panel>`
})
export class ViewEngineSchematicsPanelComponent implements OnInit, AfterViewInit {
  schematicId: number;
  schematic: SchematicObjectWithRelations;

  constructor(
    private schematicObjSvc: SchematicObjectControllerService,
  ) {}

  ngOnInit() {
    this.schematicObjSvc.findById({ id: this.schematicId, filter }).subscribe(s => {
      this.schematic = s;
    });
  }

  ngAfterViewInit() {

  }
}
