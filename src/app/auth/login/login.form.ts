import { Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl } from "@angular/forms";
import { Credentials } from "src/app/models/credentials.interface";
import { ValidationService } from "src/app/services/validation.service";

@Component({
  selector: "app-login-form",
  template: `
    <form [formGroup]="formGroup">
      <!-- <div>
        <label for="email">Your email address</label>
        <small *ngIf="mustShowError('email')">
          {{ getErrorMessage("email") }}
        </small>
        <input
          id="email"
          name="email"
          type="email"
          formControlName="email"
          placeholder="email address"
          [attr.aria-invalid]="hasError('email')"
        />
      </div> -->
      <app-email-control formControlName="email"></app-email-control>

      <app-input-control
        type="password"
        formControlName="password"
        label="Your password"
        [control]="getControl('password')"
      ></app-input-control>
      <button [disabled]="formGroup.invalid" (click)="onLogInClick()">
        Log me in
      </button>
      <button (click)="onGoHomeClick()">Go Home</button>
    </form>
    <pre>Errors : {{ formGroup.errors | json }}</pre>
    <pre>Invalid : {{ formGroup.invalid | json }}</pre>
    <pre>Valid : {{ formGroup.valid | json }}</pre>
  `,
  styles: [],
})
export class LoginForm {
  @Output() logIn = new EventEmitter<Credentials>();
  @Output() goHome = new EventEmitter();
  @Output() formDirty = new EventEmitter<boolean>();

  emailControl = new FormControl("");
  passwordControl = new FormControl("", this.validation.passwordValidators);

  formGroup = this.formBuilder.group({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    private formBuilder: FormBuilder,
    private validation: ValidationService
  ) {}

  getControl(controlName: string): AbstractControl | null {
    return this.formGroup.get(controlName);
  }
  hasError(controlName: string) {
    const control = this.getControl(controlName);
    if (!control) return false;
    return control.invalid;
  }
  mustShowError(controlName: string) {
    const control = this.getControl(controlName);
    return this.validation.mustShowMessage(control);
  }
  getErrorMessage(controlName: string) {
    const control = this.getControl(controlName);
    return this.validation.getErrorMessage(control);
  }

  onLogInClick() {
    const rawCredentials = this.formGroup.value;
    const credentials = {
      email: (rawCredentials.email as any).email || rawCredentials.email,
      password: rawCredentials.password,
    };
    console.log("credentials", credentials);
    // this.logIn.emit(credentials);
  }
  onGoHomeClick() {}
}
