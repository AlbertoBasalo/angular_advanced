import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { User } from "src/app/models/user.interface";
import { ValidationService } from "src/app/services/validation.service";
import { FormBase } from "src/app/shared/form.base";

@Component({
  selector: "app-register-form",
  template: `
    <form [formGroup]="formGroup">
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
  @Output() register = new EventEmitter<Partial<User>>();
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
    const formValue = this.formGroup.value;
    const user: Partial<User> = {
      name: formValue.name!,
      email: formValue.email!,
      password: formValue.password!,
    };
    this.register.emit(user);
  }
}
