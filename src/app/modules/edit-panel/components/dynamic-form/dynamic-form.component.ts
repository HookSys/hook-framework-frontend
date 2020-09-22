import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Metadata, FormLine, Field } from '../../types';
import { FieldTypes } from '../../enums';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {

  @Input()
  metadata: Metadata;

  @Input()
  reg: any = {};

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
  lines: FormLine[] = [];
  model: any = {};

  constructor() {}

  ngOnChanges() {
    this.loadForm();
  }

  private loadForm() {
    if (this.metadata) {
      this.formGroup = new FormGroup({});
      for (const field of this.metadata.fields) {
        if (field.visible !== false) {
          this.addToLines(field);
          this.formGroup.addControl(field.name, new FormControl('', this.getValidatorsFromField(field)));
        }
      }
      this.sortFieldsByPosition();
      this.loadModels();
    }
  }

  private loadModels() {
    if (this.metadata) {
      for (const field of this.metadata.fields) {
        if (this.reg[field.name]) {
          this.model = {
            ...this.model,
            [field.name]: this.reg[field.name] || ''
          };
        }
      }
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

  private getValidatorsFromField(field: Field): any[] {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLenght) {
      validators.push(Validators.minLength(field.minLenght));
    }
    if (field.maxLenght) {
      validators.push(Validators.maxLength(field.maxLenght));
    }
    return validators;
  }

  private addToLines(field: Field): void {
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
    this.reg = {
      ...this.reg,
      [event.target.id]: this.model[event.target.id]
    };
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
      this.save.emit(this.reg);
    }
  }

}
