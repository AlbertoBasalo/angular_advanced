import { Component } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ValidationService } from "../services/validation.service";

@Component({
  selector: "app-email-control",
  styles: [],
  template: `
    <div [formGroup]="formGroup">
      <label for="email">Your email address</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Your email address"
        formControlName="email"
        [attr.aria-invalid]="hasError('email')"
        (blur)="touchedCallback()"
      />
      <small *ngIf="mustShowMessage('name')">
        {{ getErrorMessage("name") }}
      </small>
    </div>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EmailControl, multi: true },
  ],
})
export class EmailControl implements ControlValueAccessor {
  formGroup = this.formBuilder.group({
    email: new FormControl("", this.validation.emailValidations),
  });
  touchedCallback!: () => void; // to be called from the template

  constructor(
    private formBuilder: FormBuilder,
    private validation: ValidationService
  ) {}

  // * Control Value accessor methods

  writeValue(email: any): void {
    this.formGroup.setValue({ email }, { emitEvent: false });
  }
  registerOnChange(changeCallback: any): void {
    this.formGroup.valueChanges.subscribe(changeCallback);
  }
  registerOnTouched(touchedCallback: any): void {
    this.touchedCallback = touchedCallback;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else this.formGroup.enable();
  }

  getControl(controlName: string): AbstractControl | null {
    return this.formGroup.get(controlName);
  }
  hasError(controlName: string): boolean {
    const control = this.getControl(controlName);
    if (!control) return false;
    return control.invalid;
  }

  mustShowMessage(controlName: string): boolean {
    const control = this.getControl(controlName);
    return this.validation.mustShowMessage(control);
  }

  getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    return this.validation.getErrorMessage(control);
  }
}
