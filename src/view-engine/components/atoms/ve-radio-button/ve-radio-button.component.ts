import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 've-radio-button',
  templateUrl: './ve-radio-button.component.html',
  styleUrls: ['./ve-radio-button.component.scss']
})
export class ViewEngineRadioButton implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() options: {id: string | number, value: string}[];

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
    this.value = value;
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

  public onChange(e: any) {}
  public onTouched(e: any) {}
  public onFocus(e: any) {}
}
