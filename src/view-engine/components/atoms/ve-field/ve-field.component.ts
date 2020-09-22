import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface';
import { EViewEngineFieldType, IViewEngineField } from './ve-field.interface';

@Component({
  selector: 'app-ve-field',
  templateUrl: './ve-field.component.html',
  styleUrls: ['./ve-field.component.scss']
})
export class ViewEngineFieldComponent implements OnChanges {

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

  constructor() {}

  ngOnChanges() {
    this.loadForm();
  }

  private loadForm() {
    if (this.metadata) {
      this.formGroup = new FormGroup({});
      for (const field of this.metadata.fields) {
        if (field.isVisible !== false) {
          this.addToLines(field);
          const control = new FormControl(this.data[field.name] || '', this.getValidatorsFromField(field));
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
    if (field.isRequired) {
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
      this.save.emit({ ...this.data, ...this.formGroup.value});
    }
  }

}
