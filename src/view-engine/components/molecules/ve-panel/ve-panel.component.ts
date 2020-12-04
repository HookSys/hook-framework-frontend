import { PanelWithRelations } from "models/panel-with-relations";
import { SchematicObjectWithRelations } from "models/schematic-object-with-relations";
import { Component, Input, OnInit } from "@angular/core";
import { PanelControllerService } from "view-engine/api/services";

@Component({
  selector: "ve-panel",
  templateUrl: "./ve-panel.component.html",
  styleUrls: ["./ve-panel.component.scss"],
})
export class ViewEnginePanelComponent implements OnInit {
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
    private panelService: PanelControllerService,
  ) {}

  ngOnInit() {
    debugger
    this.panelService
      .findById({ id: this.schematic.handlerId })
      .subscribe((p) => (this.component = p));
  }

}
