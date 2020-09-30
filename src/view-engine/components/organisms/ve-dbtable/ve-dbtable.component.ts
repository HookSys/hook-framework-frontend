import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ViewEngineDbTableHandler } from "./ve-dbtable.handler";
import { ViewEngineDbTableService } from "./ve-dbtable.service";
import {
  IViewEngineDbTable,
  EViewEngineDbTableModes,
  IViewEngineOpenRecordEvent,
  IViewEngineDbTableParam
} from "./ve-dbtable.interface";
import { ViewEngineFeatureHandler } from '../ve-feature/ve-feature.handler';
import { bindPathParams, getDefaultValueByType } from 'view-engine/components/common';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: "ve-dbtable",
  templateUrl: "./ve-dbtable.component.html",
  styleUrls: ["./ve-dbtable.component.scss"],
})
export class ViewEngineDbTableComponent implements OnInit {
  @Input("metadata")
  public metadata: IViewEngineDbTable;

  @Input("record")
  public record: IViewEngineDbTableParam;

  @Output()
  openChildren = new EventEmitter<IViewEngineOpenRecordEvent>();

  public dbtable: IViewEngineDbTable;
  public isVisible: boolean = false;
  public mode: EViewEngineDbTableModes = EViewEngineDbTableModes.GRID;
  public selected: any;
  public data: any[] = [];
  public isLoading = false;

  constructor(
    private dbtableHandler: ViewEngineDbTableHandler,
    private dbtableService: ViewEngineDbTableService,
  ) {}

  ngOnInit() {
    this.toggleLoader();
    this.dbtableService.getFields(this.metadata.id).subscribe((fields) => {
      this.dbtable = { ...this.metadata, fields };
      this.dbtableHandler.fireOnBeforeLoad(this.dbtable).then((response) => {
        if (response) {
          const url = bindPathParams(this.record, this.metadata.controller);
          this.dbtableService.getData(url).subscribe((data) => {
            this.data = data;
            this.toggleLoader()
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

  toggleLoader() {
    this.isLoading = !this.isLoading;
  }

  onDblClickReg(data: IViewEngineDbTableParam): void {
    if (typeof this.metadata.children !== "undefined") {
      this.openChildren.emit({
        children: this.dbtable.children,
        data: Object.assign({}, data, { pk: data[this.metadata.pk ]}),
      })
    }
    this.dbtableHandler.fireOnDblClick(this.dbtable, data);
  }

  onEdit() {
    this.mode = EViewEngineDbTableModes.EDIT;
    this.dbtableHandler.fireOnChangeGridMode(this.dbtable, this.mode);
  }

  onCancel() {
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

  onSave({ data, values }) {
    if (this.mode === EViewEngineDbTableModes.NEW) {
      const url = bindPathParams(this.record, this.metadata.controller);

      this.toggleLoader();
      this.dbtableService.createData(url, values).pipe(
        finalize(() => this.toggleLoader())
      ).subscribe((newReg) => this.data.push(newReg));

    } else if (this.mode === EViewEngineDbTableModes.EDIT) {
      const url = bindPathParams({
        ...this.record,
        __pk: data[this.metadata.pk]
      }, this.metadata.controller.concat('/{__pk}'));

      this.toggleLoader();
      const serialized = this.dbtable.fields.reduce((request, field) => {
        if (values[field.name]) {
          return {
            ...request,
            [field.name]: getDefaultValueByType(values[field.name], field),
          }
        }
        return request
      }, {})
      this.dbtableService.saveData(url, serialized).pipe(
        finalize(() => this.toggleLoader())
      ).subscribe(() => {
        const newReg = { ...data, ...values };
        this.data = this.data.map((reg) => {
          if (reg[this.dbtable.pk] === newReg[this.dbtable.pk]) {
            return newReg;
          }
          return reg;
        });
      })
    }
    this.selected = null;
    this.mode = EViewEngineDbTableModes.GRID;
  }

  onSelectReg(reg: any) {
    this.selected = reg;
  }
}
