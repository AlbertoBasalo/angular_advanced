import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ValidationService } from "../services/validation.service";

@Component({
  selector: "app-input-control",
  template: `
    <div>
      <label [for]="formControlName">{{ label | uppercase }}</label>
      <small *ngIf="mustShowMessage()">
        {{ getErrorMessage() }}
      </small>
      <input
        [id]="formControlName"
        [name]="formControlName"
        [type]="type"
        [placeholder]="label"
        [value]="value"
        [attr.aria-invalid]="hasError()"
        [disabled]="isDisabled"
        (blur)="touchedCallback()"
        (keyup)="onChange($event)"
      />
    </div>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputControl, multi: true },
  ],
})
export class InputControl implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() formControlName: string = "";
  @Input() type: "text" | "password" | "number" = "text";
  @Input() control!: AbstractControl | null;

  value: any;
  isDisabled: boolean = false;
  changeCallback!: (value: any) => void;
  touchedCallback!: () => void;

  constructor(private validation: ValidationService) {}

  onChange(event: any) {
    const value = event.target.value;
    this.changeCallback(value);
  }

  writeValue(value: any): void {
    console.log("writeValue", value);
    this.value = value;
  }
  registerOnChange(changeCallBack: (nv: any) => void): void {
    console.log("registerOnChange");
    this.changeCallback = changeCallBack;
  }
  registerOnTouched(touchedCallback: () => void): void {
    console.log("registerOnTouched");
    this.touchedCallback = touchedCallback;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  hasError(): boolean {
    return this.control?.invalid || false;
  }
  mustShowMessage(): boolean {
    return this.validation.mustShowMessage(this.control);
  }
  getErrorMessage(): string {
    return this.validation.getErrorMessage(this.control);
  }
}
