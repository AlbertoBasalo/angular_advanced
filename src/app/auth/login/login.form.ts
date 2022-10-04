import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { Credentials } from "src/app/models/credentials.interface";
import { ValidationService } from "src/app/services/validation.service";
import { FormBase } from "src/app/shared/form.base";

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
  `,
  styles: [],
})
export class LoginForm extends FormBase {
  @Output() logIn = new EventEmitter<Partial<Credentials>>();
  @Output() goHome = new EventEmitter();
  @Output() formDirty = new EventEmitter<boolean>();

  emailControl = new FormControl("");
  passwordControl = new FormControl("", this.validation.passwordValidators);

  override formGroup = this.formBuilder.group({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private formBuilder: FormBuilder, validation: ValidationService) {
    super(validation);
  }

  onLogInClick() {
    const rawCredentials = this.formGroup.value;
    console.log("Logging in...", rawCredentials);
    this.logIn.emit(rawCredentials);
  }
  onGoHomeClick() {}
}
