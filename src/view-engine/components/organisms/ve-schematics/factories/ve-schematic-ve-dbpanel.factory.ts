import { Store } from '@ngxs/store';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ɵConsole } from '@angular/core';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { SchematicObjectControllerService } from '../../../../api/services/schematic-object-controller.service';
import { FilterBuilder } from 'view-engine/api/query';
import { AppendSchematic } from 'view-engine/store/engine/schematic/schematic.actions';

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
  parent: number;
  schematic: SchematicObjectWithRelations;

  constructor(
    private store: Store,
    private schematicObjSvc: SchematicObjectControllerService,
  ) {}

  ngOnInit() {
    this.schematicObjSvc.findById({ id: this.schematic.id, filter }).subscribe(s => {
      this.schematic = s;
      this.store.dispatch(new AppendSchematic(this.parent, 'DBPANEL', s))
    });
  }

  ngAfterViewInit() {

  }
}
