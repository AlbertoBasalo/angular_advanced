import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ValidationService } from "../services/validation.service";
import { ControlBase } from "./control.base";

@Component({
  selector: "app-input-control",
  template: `
    <div>
      <label [for]="formControlName">{{ label | uppercase }}</label>
      <small *ngIf="mustShowError()">
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
export class InputControl extends ControlBase implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() formControlName: string = "";
  @Input() type: "text" | "password" | "number" = "text";
  @Input() override control!: AbstractControl | null;

  value: any;
  isDisabled: boolean = false;
  changeCallback!: (value: any) => void;
  touchedCallback!: () => void;

  constructor(validation: ValidationService) {
    super(validation);
  }

  onChange(event: any) {
    const value = event.target.value;
    this.changeCallback(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(changeCallBack: (nv: any) => void): void {
    this.changeCallback = changeCallBack;
  }
  registerOnTouched(touchedCallback: () => void): void {
    this.touchedCallback = touchedCallback;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
