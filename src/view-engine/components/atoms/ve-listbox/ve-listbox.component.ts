import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 've-listbox',
  templateUrl: './ve-listbox.component.html',
  styleUrls: ['./ve-listbox.component.scss']
})
export class ViewEngineListBox implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string;
  @Input() name: string;
  @Input() disabled: boolean;
  data: {id: string, text: string}[] = [
    { text: "Hennessey Venom", id: "list-01" },
    { text: "Bugatti Chiron", id: "list-02" },
    { text: "Bugatti Veyron Super Sport", id: "list-03" },
    { text: "SSC Ultimate Aero", id: "list-04" },
    { text: "Koenigsegg CCR", id: "list-05" },
    { text: "McLaren F1", id: "list-06" },
    { text: "Aston Martin One- 77", id: "list-07" },
    { text: "Jaguar XJ220", id: "list-08" },
    { text: "McLaren P1", id: "list-09" },
    { text: "Ferrari LaFerrari", id: "list-10" },
    { text: "Zenvo ST1", id: "list-11" },
    { text: "Lamborghini Veneno", id: "list-12" }];

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
