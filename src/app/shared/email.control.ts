import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { ValidationService } from "../services/validation.service";

@Component({
  selector: "app-email-control",
  template: `
    <div [formGroup]="formGroup">
      <label for="email">Your email address</label>
      <small *ngIf="mustShowMessage()">
        {{ getErrorMessage() }}
      </small>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Your email address"
        formControlName="email"
        [attr.aria-invalid]="hasError()"
        (blur)="touchedCallback()"
      />
    </div>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EmailControl, multi: true },
    {
      provide: NG_VALIDATORS,
      useExisting: EmailControl,
      multi: true,
    },
  ],
})
export class EmailControl implements ControlValueAccessor, Validator {
  @Input() formControlName: string = "email";

  control = new FormControl("", this.validation.emailValidator);
  formGroup = this.formBuilder.group({
    email: this.control,
  });
  touchedCallback!: () => void;
  validatorChangeCallback!: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private validation: ValidationService
  ) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log("validating", control);
    return this.control?.errors || null;
  }
  registerOnValidatorChange?(validatorChangeCallback: () => void): void {
    console.log("registerOnValidatorChange");
    this.validatorChangeCallback = validatorChangeCallback;
  }

  registerOnChange(changeCallback: any): void {
    console.log("registerOnChange");
    this.control.valueChanges.subscribe((value) => {
      console.log("valueChanges", value);
      changeCallback(value);
      this.validatorChangeCallback();
    });
    // this.formGroup.valueChanges.subscribe(this.validatorChangeCallback);
  }
  registerOnTouched(touchedCallback: any): void {
    this.touchedCallback = touchedCallback;
  }
  writeValue(email: any): void {
    this.formGroup.setValue({ email }, { emitEvent: false });
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  getControl(controlName: string): AbstractControl | null {
    return this.formGroup.get(controlName);
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
