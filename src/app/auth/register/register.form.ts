import { Component } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { ValidationService } from "src/app/services/validation.service";
import { FormBase } from "src/app/shared/form.base";

@Component({
  selector: "app-register-form",
  template: `
    <form [formGroup]="formGroup">
      <!-- <div>
        <label for="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          formControlName="name"
          [attr.aria-invalid]="hasError('name')"
        />
        <small *ngIf="mustShowMessage('name')">
          {{ getErrorMessage("name") }}
        </small>
      </div> -->
      <!-- <div>
        <label for="password">Your password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          formControlName="password"
          [attr.aria-invalid]="hasError('password')"
        />
        <small *ngIf="mustShowMessage('password')">
          {{ getErrorMessage("password") }}
        </small>
      </div> -->
      <!-- <div>
        <label for="confirmPassword">Repeat Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="confirm password"
          formControlName="confirmPassword"
          [attr.aria-invalid]="hasError('confirmPassword')"
        />
        <small *ngIf="mustShowMessage('confirmPassword')">
          {{ getErrorMessage("confirmPassword") }}
        </small>
      </div> -->
      <app-input-control
        label="Your name"
        formControlName="name"
        type="text"
        [control]="getControl('name')"
      ></app-input-control>
      <app-email-control formControlName="email"></app-email-control>
      <app-input-control
        label="Your password"
        formControlName="password"
        type="password"
        [control]="getControl('password')"
      ></app-input-control>
      <app-input-control
        label="Repeat password"
        formControlName="confirmPassword"
        type="password"
        [control]="getControl('confirmPassword')"
      ></app-input-control>
      <small *ngIf="mustShowError('form')">
        {{ getErrorMessage("form") }}
      </small>
      <button [disabled]="formGroup.invalid" (click)="onRegisterClick()">
        Register
      </button>
    </form>
  `,
  styles: [],
})
export class RegisterForm extends FormBase {
  override formGroup = this.formBuilder.group(
    {
      name: new FormControl("", this.validation.nameValidator),
      email: new FormControl("", this.validation.emailValidator),
      password: new FormControl("", this.validation.passwordValidators),
      confirmPassword: new FormControl("", this.validation.passwordValidators),
    },
    { validators: this.validation.passwordMatch }
  );

  constructor(private formBuilder: FormBuilder, validation: ValidationService) {
    super(validation);
  }

  onRegisterClick() {
    console.log("Registering...", this.formGroup.value);
  }
}
