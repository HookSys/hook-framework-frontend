import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 've-text-area',
  templateUrl: './ve-text-area.component.html',
  styleUrls: ['./ve-text-area.component.scss']
})
export class ViewEngineTextArea implements OnInit, ControlValueAccessor {
  @Input() label: string = '';;
  @Input() placeholder: string = '';;
  @Input() id: string;
  @Input() name: string;
  @Input() disabled: boolean;

  value: string = '';

  constructor(
    @Self() @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  writeValue(value: string): void {
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
