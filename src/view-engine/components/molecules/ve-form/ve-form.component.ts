import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface';
import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { getDefaultValueByType } from 'view-engine/components/common';
import { EViewEngineFieldType, IViewEngineField } from './ve-form.interface';

@Component({
  selector: 've-form',
  templateUrl: './ve-form.component.html',
  styleUrls: ['./ve-form.component.scss']
})
export class ViewEngineFormComponent implements OnChanges {
  @Input()
  metadata: IViewEngineDbTable;

  @Input()
  data: any = {};

  @Output('save')
  save = new EventEmitter<any>();

  @Output('cancel')
  cancel = new EventEmitter<any>();

  @Output('change')
  change = new EventEmitter<any>();

  @Output('blur')
  blur = new EventEmitter<any>();

  @Output('focus')
  focus = new EventEmitter<any>();

  formGroup: FormGroup;
  lines: Array<Pick<IViewEngineField, 'line'> & { fields: IViewEngineField[] }> = [];
  model: any = {};
  isVisible = false;

  public ViewEngineFieldType = EViewEngineFieldType;

  ngOnChanges() {
    this.loadForm();
  }

  private loadForm() {
    if (this.metadata) {
      this.formGroup = new FormGroup({});
      for (const field of this.metadata.fields) {
        if (field.isVisible !== false) {
          this.addToLines(field);
          const control = new FormControl(
            getDefaultValueByType(this.data[field.name], field),
            this.getValidatorsFromField(field)
          );
          if (field.isReadOnly) {
            control.disable({ onlySelf: true, emitEvent: true });
          }
          this.formGroup.addControl(field.name, control);
        }
      }
      this.sortFieldsByPosition();
    }
  }

  private sortFieldsByPosition() {
    this.lines = this.lines.map(line => {
      line.fields = line.fields.sort((field1, field2) => {
        if (field1.position > field2.position) {
          return 1;
        } else if (field1.position < field2.position) {
          return -1;
        } else {
          return 0;
        }
      });
      return line;
    });
  }

  private getValidatorsFromField(field: IViewEngineField): any[] {
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

  private addToLines(field: IViewEngineField): void {
    const line = this.lines.find((lin) => lin.line === field.line);
    if (line) {
      line.fields.push(field);
    } else {
      this.lines.push({
        line: field.line,
        fields: [field]
      });
    }
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onInputChange(event: any) {
    this.change.emit(event);
  }

  public onInputBlur(event: any) {
    this.blur.emit(event);
  }

  public onInputFocus(event: any) {
    this.focus.emit(event);
  }

  public onSubmit() {
    if (this.formGroup.valid) {
      this.save.emit({ data: this.data, values: this.formGroup.value});
    }
  }
}
