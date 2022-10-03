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
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email address"
          formControlName="email"
          [attr.aria-invalid]="hasError('email')"
        />
        <small *ngIf="mustShowMessage('name')">
          {{ getErrorMessage("name") }}
        </small>
      </div> -->
      <app-email-control formControlName="email"></app-email-control>
      <div>
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
      </div>
      <button (click)="onLogInClick()">Log me in</button>
      <button (click)="onGoHomeClick()">Go Home</button>
    </form>
  `,
  styles: [],
})
export class LoginForm {
  @Output() login = new EventEmitter<Credentials>();
  @Output() goHome = new EventEmitter();
  @Output() formDirty = new EventEmitter<boolean>();

  formGroup = this.formBuilder.group({
    email: "albertoBasalo@hotmail.com",
    password: new FormControl("", this.validation.passwordValidations),
  });

  constructor(
    private formBuilder: FormBuilder,
    private validation: ValidationService
  ) {
    this.formGroup.valueChanges.subscribe((change) => {
      this.formDirty.emit(this.formGroup.dirty);
    });
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

  onLogInClick() {
    this.formGroup.markAsPristine();
    const rawCredentials = this.formGroup.value;
    const credentials = {
      email: (rawCredentials.email as any).email || rawCredentials.email,
      password: rawCredentials.password,
    };
    this.login.emit(credentials);
  }
  onGoHomeClick() {
    this.goHome.emit();
  }
}
