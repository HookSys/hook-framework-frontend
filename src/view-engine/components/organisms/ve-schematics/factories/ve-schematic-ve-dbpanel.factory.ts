import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ɵConsole } from '@angular/core';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { SchematicObjectControllerService } from '../../../../api/services/schematic-object-controller.service';
import { FilterBuilder } from 'view-engine/api/query';

const filter = new FilterBuilder<SchematicObjectWithRelations>({
  include: [{
    relation: 'childs'
  }]
}).build();

@Component({
  selector: 've-schematics-ve-dbpanel',
  template: `<ve-dbpanel *ngIf="schematic" [schematic]="schematic"></ve-dbpanel>`
})
export class ViewEngineSchematicsDbPanelComponent implements OnInit, AfterViewInit {
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
