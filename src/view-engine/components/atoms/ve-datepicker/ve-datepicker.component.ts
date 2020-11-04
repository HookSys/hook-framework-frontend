import { CustomAdapter, CustomDateParser, CustomDateParserFormatter } from './ve-datepicker.adapter';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 've-datepicker',
  templateUrl: './ve-datepicker.component.html',
  styleUrls: ['./ve-datepicker.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomDateParser},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
  ]
})
export class ViewEngineDatePicker implements OnInit, ControlValueAccessor {
  @Input() label?: string = '';
  @Input() placeholder?: string = '';
  @Input() id: string;
  @Input() name: string;
  @Input() disabled: boolean;

  value: any = '';

  constructor(
    @Self() @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  writeValue(value: any): void {
    this.value = new Date(value).toLocaleDateString('pt-BR');
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange() {}
  private onTouched() {}
  private onFocus() {}
}
