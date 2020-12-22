import { SchematicsState } from 'view-engine/store/engine/schematic/schematic.state';
import { PanelWithRelations } from "models/panel-with-relations";
import { SchematicObjectWithRelations } from "models/schematic-object-with-relations";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { PanelControllerService } from "view-engine/api/services";
import {  Store } from '@ngxs/store';

@Component( {
  selector: "ve-panel",
  templateUrl: "./ve-panel.component.html",
  styleUrls: [ "./ve-panel.component.scss" ]
} )
export class ViewEnginePanelComponent implements OnInit, OnDestroy {
  @Input()
  schematic: SchematicObjectWithRelations;

  sizes = {
    FULL: 12,
    TWO: 6,
    THREE: 4,
  };
  @Input()
  parent: number;

  component: PanelWithRelations;
  constructor(
    private store: Store,
    private panelService: PanelControllerService,
  ) {
  }

  ngOnInit() {
    this.panelService
      .findById( { id: this.schematic.handlerId } )
      .subscribe( ( p ) => {
        this.component = p;
        this.store.select(SchematicsState.getSchematic(this.schematic.id)).subscribe( (panel) => {
          if (panel && panel.childs && panel.childs.length > 1 ) {
            this.component.size = panel.childs.length > 2 ? 'THREE' : 'TWO';
            this.schematic.childs = panel.childs;
          }
        } )
      } );
  }

  ngOnDestroy() {
  }

}
