import { Component, Input, OnInit } from "@angular/core";
import { ViewEngineDbTableHandler } from "./ve-dbtable.handler";
import { ViewEngineDbTableService } from "./ve-dbtable.service";
import {
  IViewEngineDbTable,
  EViewEngineDbTableModes,
} from "./ve-dbtable.interface";

@Component({
  selector: "ve-dbtable",
  templateUrl: "./ve-dbtable.component.html",
  styleUrls: ["./ve-dbtable.component.scss"],
})
export class ViewEngineDbTableComponent implements OnInit {
  @Input("id")
  public id: string;

  public dbtable: IViewEngineDbTable;
  public isVisible: boolean = false;
  public mode: EViewEngineDbTableModes = EViewEngineDbTableModes.GRID;
  public selected: any;
  public data: any[] = [];

  constructor(
    private dbtableHandler: ViewEngineDbTableHandler,
    private dbtableService: ViewEngineDbTableService
  ) {}

  ngOnInit() {
    this.dbtableService.get(this.id).subscribe((dbtable) => {
      this.dbtable = dbtable;
      this.dbtableHandler.fireOnBeforeLoad(this.dbtable).then((response) => {
        if (response) {
          this.dbtableService.getData(dbtable.controller).subscribe((data) => {
            this.data = data;
            setTimeout(() => this.isVisible = response);
          })
        }
      });
    });
  }

  ngOnDestroy() {
    this.dbtableHandler.fireOnBeforeClose(this.dbtable).then((response) => {
      this.isVisible = !response;
    });
  }

  onInputFocus(event: any) {
    this.dbtableHandler.fireOnFocus(this.dbtable, event);
  }

  onInputBlur(event: any) {
    this.dbtableHandler.fireOnBlur(this.dbtable, event);
  }

  onInputChange(event: any) {
    this.dbtableHandler.fireOnChange(this.dbtable, event);
  }

  onDblClickReg(data: any){
    this.dbtableHandler.fireOnDblClick(this.dbtable, data);
  }

  onEdit() {
    this.mode = EViewEngineDbTableModes.EDIT;
    this.dbtableHandler.fireOnChangeGridMode(this.dbtable, this.mode);
  }

  onCancel() {
    this.selected = null;
    this.mode = EViewEngineDbTableModes.GRID;
    this.dbtableHandler.fireOnChangeGridMode(this.dbtable, this.mode);
  }

  onAdd() {
    let nextIndex = 0;
    if (this.data.length > 0) {
      nextIndex = this.data.reduce((prev, current) => {
        if (prev[this.dbtable.pk] > current[this.dbtable.pk]) {
          return prev;
        } else {
          return current;
        }
      })[this.dbtable.pk];
    }

    this.selected = {
      [this.dbtable.pk]: nextIndex + 1,
    };
    this.mode = EViewEngineDbTableModes.NEW;
  }

  onSave(newReg: any) {
    if (this.mode === EViewEngineDbTableModes.NEW) {
      this.data.push(newReg);
    } else if (this.mode === EViewEngineDbTableModes.EDIT) {
      this.data = this.data.map((reg) => {
        if (reg[this.dbtable.pk] === newReg[this.dbtable.pk]) {
          return newReg;
        }
        return reg;
      });
    }
    this.selected = null;
    this.mode = EViewEngineDbTableModes.GRID;
  }

  onSelectReg(reg: any) {
    this.selected = reg;
  }
}
