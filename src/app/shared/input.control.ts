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
    <label [for]="formControlName">{{ label || formControlName }}</label>
    <input
      [type]="type"
      [id]="formControlName"
      [name]="formControlName"
      [placeholder]="placeholder || label || formControlName"
      [attr.aria-invalid]="hasError()"
      [value]="value"
      (keyup)="onChange($event)"
      (blur)="onBlur()"
    />
    <small *ngIf="mustShowMessage()">{{ getErrorMessage() }}</small>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputControl, multi: true },
  ],
})
export class InputControl implements ControlValueAccessor {
  @Input() formControlName: string = "";
  @Input() type: "text" | "password" | "email" | "number" = "text";
  @Input() label!: string;
  @Input() placeholder!: string;
  // * the control instance is created in the parent form
  @Input() control!: AbstractControl | null;

  // * Control Value accessor methods
  value: any;
  private changedCallback!: (value: any) => void;
  private touchedCallback!: () => void;

  constructor(private validation: ValidationService) {}

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(changeCallBack: (nv: any) => void): void {
    this.changedCallback = changeCallBack;
  }
  registerOnTouched(touchedCallback: () => void): void {
    this.touchedCallback = touchedCallback;
  }

  // * template events handlers
  onChange(event: any) {
    this.value = event.target.value;
    this.changedCallback(this.value);
    this.touchedCallback();
  }
  onBlur() {
    this.touchedCallback();
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
