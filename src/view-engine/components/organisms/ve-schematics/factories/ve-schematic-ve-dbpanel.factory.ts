import { Store } from '@ngxs/store';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ɵConsole, OnChanges } from '@angular/core';
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
  template: `<ve-dbpanel *ngIf="schematicObj"  [parent]="parent"  [schematic]="schematicObj"></ve-dbpanel>`
})
export class ViewEngineSchematicsDbPanelComponent implements OnInit, OnChanges, AfterViewInit {
  parent: number;
  schematic: SchematicObjectWithRelations;
  schematicObj?: SchematicObjectWithRelations = null;

  constructor(
    private store: Store,
    private schematicObjSvc: SchematicObjectControllerService,
  ) {}


  ngOnChanges() {
    this.schematicObj = this.schematic
  }

  ngOnInit() {
    this.schematicObjSvc.findById({ id: this.schematic.id, filter }).subscribe(s => {
      this.schematicObj = s;
      this.store.dispatch(new AppendSchematic(this.parent, "DBPANEL", s));
    });
  }

  ngAfterViewInit() {

  }
}
