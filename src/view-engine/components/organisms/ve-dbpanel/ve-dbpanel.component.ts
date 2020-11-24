import { getDefaultValueByType } from 'view-engine/components/common';
import { ViewEngineFormComponent } from './../../molecules/ve-form/ve-form.component';
import { DbPanelControllerService } from '../../../api/services/db-panel-controller.service';
import { DbPanelWithRelations } from '../../../api/models/db-panel-with-relations';
import { Component,  Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SchematicObjectWithRelations } from 'view-engine/api/models';
import { tap, finalize, filter } from 'rxjs/operators';
import { EViewEngineFieldType } from 'view-engine/components/molecules/ve-form/ve-form.interface';
import { Subject } from 'rxjs';

enum EViewEngineDbPanelStates {
  GRID = 'GRID',
  EDIT = 'EDIT',
  NEW = 'NEW'
};

@Component({
  selector: "ve-dbpanel",
  templateUrl: "./ve-dbpanel.component.html",
  styleUrls: ["./ve-dbpanel.component.scss"],
})
export class ViewEngineDbPanelComponent implements OnInit, OnDestroy {
  @Input()
  schematic: SchematicObjectWithRelations;
  component: DbPanelWithRelations;


  isLoading: boolean = false;
  isVisible: boolean = true;
  state: EViewEngineDbPanelStates = EViewEngineDbPanelStates.GRID;

  records: object[];
  selectedRecord: object;

  @ViewChild(ViewEngineFormComponent, { static: false })
  form: ViewEngineFormComponent;

  constructor(private dbPanelService: DbPanelControllerService,
    ) {}

  ngOnInit() {
    const { dbPanelService } = this;
    this.isLoading = true;
    dbPanelService.metadata({ id: this.schematic.handlerId })
      .pipe(tap((dbpanel) => this.component = dbpanel))
      .subscribe(() =>
        dbPanelService.getAllRecords({ id: this.schematic.handlerId })
          .pipe(finalize(() => this.isLoading = false))
          .subscribe((records) => this.records = records)
        )
  }

  activate() {
    this.isLoading = true;
    return this.dbPanelService.getAllRecords({ id: this.schematic.handlerId })
    .pipe(finalize(() => this.isLoading = false))
    .subscribe((records) => this.records = records)
  }

  serialize(values: object) {
    const { view, table } = this.component;
    return view.attributes.reduce((request, field) => {
      if (field.name === table.pkField) {
        return request
      }
      if (values[field.name] || field.component === EViewEngineFieldType.CHECKBOX) {
        return {
          ...request,
          [field.name]: getDefaultValueByType(values[field.name], field),
        }
      }
      return request
    }, {})
  }

  onSelectRecord(record: object) {
    if (!this.selectedRecord || this.selectedRecord[this.component.table.pkField] !== record[this.component.table.pkField]) {
      this.selectedRecord = record;
    }
  }

  onDblClick(record: object) {
  }

  getTitle(): string {
    const { view: { description }} = this.component;
    return description;
  }

  onEditRecord(){
    this.state = EViewEngineDbPanelStates.EDIT;
  }

  onAddRecord(){
    this.state = EViewEngineDbPanelStates.NEW;
  }

  onCancel() {
    this.state = EViewEngineDbPanelStates.GRID;
  }

  onSave() {
    this.isLoading = true;
    const { handler } = this.form;
    const values = this.serialize(handler.value);
    handler.updateValueAndValidity();
    setTimeout(() => {
      if (handler.valid) {
        if (this.state === EViewEngineDbPanelStates.NEW) {
          this.dbPanelService.createRecord({
            id: this.component.id,
            record: values
          }).subscribe(() => this.isLoading = false)
        } else {
          this.dbPanelService.saveRecord({
            id: this.component.id,
            recordId: this.selectedRecord[this.component.table.pkField],
            record: values
          }).subscribe(() => this.isLoading = false)
        }
        this.state = EViewEngineDbPanelStates.GRID;
        this.selectedRecord = { ...this.selectedRecord, ...values }
        setTimeout(() => this.activate())
      }
    })
  }

  ngOnDestroy() {
  }

}
