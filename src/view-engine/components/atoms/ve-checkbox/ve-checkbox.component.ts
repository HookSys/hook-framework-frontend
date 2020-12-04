import { Component, OnInit, Input, Self, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 've-checkbox',
  templateUrl: './ve-checkbox.component.html',
  styleUrls: ['./ve-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ViewEngineCheckbox),
      multi: true
    }
  ]
})
export class ViewEngineCheckbox implements OnInit, ControlValueAccessor {
  @Input() label?: string = '';
  @Input() id: string;
  @Input() name: string;
  @Input() disabled: boolean;

  value: boolean;

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
