import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { getDefaultValueByType } from 'view-engine/components/common';
import { EViewEngineFieldType } from './ve-form.interface';
import { ViewAttribute } from 'view-engine/api/models';

@Component({
  selector: 've-form',
  templateUrl: './ve-form.component.html',
  styleUrls: ['./ve-form.component.scss']
})
export class ViewEngineFormComponent implements OnChanges {
  @Input('attributes')
  attributes: ViewAttribute[];
  @Input('record')
  record: any = {};
  @Input('pkField')
  pkField: string;

  handler: FormGroup;
  rows: Array<
    Pick<ViewAttribute, 'line'> &
    { fields: ViewAttribute[] }
  > = [];

  ngOnChanges() {
    this.loadForm();
  }

  private loadForm() {
    if (this.attributes) {
      this.handler = new FormGroup({});
      for (const field of this.attributes) {
        if (field.isVisible !== false && field.name !== this.pkField) {
          this.addToRows(field);
          const control = new FormControl(
            getDefaultValueByType(this.record[field.name], field),
            this.getValidatorsFromField(field)
          );
          if (field.isReadOnly) {
            control.disable({ onlySelf: true, emitEvent: true });
          }
          this.handler.addControl(field.name, control);
        }
      }
      this.sortFieldsByPosition();
    }
  }

  private sortFieldsByPosition() {
    this.rows = this.rows.map(row => {
      row.fields = row.fields.sort((field1, field2) => {
        if (field1.position > field2.position) {
          return 1;
        } else if (field1.position < field2.position) {
          return -1;
        } else {
          return 0;
        }
      });
      return row;
    });
  }

  private getValidatorsFromField(field: ViewAttribute): any[] {
    const validators = [];
    if (field.isRequired && field.type !== EViewEngineFieldType.CHECKBOX) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    return validators;
  }

  private addToRows(field: ViewAttribute): void {
    const row = this.rows.find((lin) => lin.line === field.line);
    if (row) {
      row.fields.push(field);
    } else {
      this.rows.push({
        line: field.line,
        fields: [field]
      });
    }
  }

  public onInputChange(event: any) {
  }

  public onInputBlur(event: any) {
  }

  public onInputFocus(event: any) {
  }

  public onCancel(event: any) {
  }

  ViewEngineFieldType = EViewEngineFieldType;

}
