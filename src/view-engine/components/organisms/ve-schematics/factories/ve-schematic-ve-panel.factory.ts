import { AppendSchematic, CreateSchematic } from 'view-engine/store/engine/schematic/schematic.actions';
import { Store } from '@ngxs/store';
import { AfterViewInit, Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { SchematicObjectControllerService } from './../../../../api/services/schematic-object-controller.service';
import { FilterBuilder } from 'view-engine/api/query';

const filter = new FilterBuilder<SchematicObjectWithRelations>({
  include: [{
    relation: 'childs'
  }]
}).build();

@Component({
  selector: 've-schematics-ve-panel',
  template: `<ve-panel *ngIf="schematicObj" [parent]="parent" [schematic]="schematicObj"></ve-panel>`
})
export class ViewEngineSchematicsPanelComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  schematic: SchematicObjectWithRelations;
  parent: number;
  schematicObj?: SchematicObjectWithRelations = null;

  constructor(
    private store: Store,
    private schematicObjSvc: SchematicObjectControllerService,
  ) {
  }

  ngOnChanges() {
    this.schematicObj = this.schematic
  }

  ngOnInit() {
    this.schematicObjSvc.findById({ id: this.schematic.id, filter }).subscribe(s => {
      this.schematicObj = s;
      this.store.dispatch(new AppendSchematic(this.parent, "PANEL", s));
    });
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

  }
}
