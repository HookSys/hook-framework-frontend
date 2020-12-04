import { CreateSchematic } from 'view-engine/store/engine/schematic/schematic.actions';
import { Store } from '@ngxs/store';
import { ViewEnginePanelComponent } from './../../../molecules/ve-panel/ve-panel.component';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ɵConsole } from '@angular/core';
import { SchematicObject } from 'models/schematic-object';
import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
import { SchematicObjectControllerService } from './../../../../api/services/schematic-object-controller.service';
import { ViewEnginePanelDirective } from './../../../molecules/ve-panel/ve-panel.directive';
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
export class ViewEngineSchematicsPanelComponent implements OnInit, AfterViewInit {
  schematic: SchematicObjectWithRelations;
  parent: number;

  schematicObj = null;

  constructor(
    private store: Store,
    private schematicObjSvc: SchematicObjectControllerService,
  ) {}

  ngOnInit() {
    this.schematicObjSvc.findById({ id: this.schematic.id, filter }).subscribe(s => {
      this.schematicObj = s;
      this.store.dispatch(new CreateSchematic(s))
    });
  }

  ngAfterViewInit() {

  }
}
