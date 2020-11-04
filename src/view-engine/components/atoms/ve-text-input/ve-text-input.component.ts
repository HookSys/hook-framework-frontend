import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 've-text-input',
  templateUrl: './ve-text-input.component.html',
  styleUrls: ['./ve-text-input.component.scss']
})
export class ViewEngineTextInput implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() mask: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';

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

  private onChange() {}
  private onTouched() {}
  private onFocus() {}
}
