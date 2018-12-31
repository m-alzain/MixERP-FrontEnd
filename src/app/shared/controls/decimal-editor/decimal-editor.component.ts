import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b-decimal-editor',
  templateUrl: './decimal-editor.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DecimalEditorComponent }]
})
export class DecimalEditorComponent implements ControlValueAccessor {

  private PADDING = '000000';
  private DECIMAL_SEPARATOR = '.';
  private THOUSANDS_SEPARATOR = ',';

  ///////////////// Implementation of ControlValueAccessor
  @ViewChild('input')
  input: ElementRef;

  @Input()
  leftAlign = false;

  onChange: (val: any) => void;
  onTouched: () => void;
  onValidatorChange: () => void;
  isDisabled: boolean;

  writeValue(v: any): void {

    v = v || '';
    this.input.nativeElement.value = this.format(v); // Format
  }

  registerOnChange(fn: (val: any) => void): void {
    this.onChange = (val) => {
      fn(this.parse(val));
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ///////////////// Helper methods: Copied from the Internet and modified
  // Credit goes to https://stackoverflow.com/questions/51306811/angular-6-input-type-number-and-display-2-digits-after-comma

  private format(value: number | string, fractionSize: number = 2): string {

    // Takes a number and formats it with a decimal point and a thousands separator
    let [integer, fraction = ''] = (value || '0').toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
      : '';

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return integer + fraction;
  }

  private parse(value: string, fractionSize: number = 2): number {

    // Reverses the effect of 'format' method above, and returns the original number
    let [integer, fraction = ''] = (value || '').split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
      : '';

    const stringResult = integer + fraction;
    return !!stringResult ? +stringResult : 0;
  }

  ////////////////// Behavior
  onBlur(value) {
    // Always format the input on blur
    this.input.nativeElement.value = this.format(this.parse(value));
  }
}
