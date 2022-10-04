import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  nameValidator = [Validators.required, Validators.minLength(3)];
  emailValidator = [Validators.required, Validators.email];
  passwordValidators = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(8),
  ];

  constructor() {}

  passwordMatch(form: AbstractControl): ValidationErrors | null {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    if (!password || !confirmPassword) {
      return {
        passwordMatch: "No passwords provided",
      };
    }
    if (password.value !== confirmPassword.value) {
      return {
        passwordMatch: "Passwords do not match!",
      };
    }
    return null;
  }

  mustShowMessage(control: AbstractControl | null): boolean {
    if (!control) return false;
    return control.touched && control.invalid;
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (!control) return "";
    if (!control.errors) return "";
    const errors = control.errors;
    let errorMessage = "";
    errorMessage += errors["required"] ? "🔥 Field is required" : "";
    errorMessage += errors["email"] ? "🔥 Should be an email address" : "";
    errorMessage += this.getLengthErrorMessage(errors);
    if (errorMessage === "") {
      errorMessage = this.getJsonErrorMessage(errors);
    }
    return errorMessage;
  }

  private getLengthErrorMessage(errors: ValidationErrors): string {
    let errorMessage = "";
    const minLength = errors["minlength"];
    const maxLength = errors["maxlength"];
    if (minLength) {
      errorMessage += `🔥 Should be at least ${minLength.requiredLength} characters long`;
    }
    if (maxLength) {
      errorMessage += `🔥 Should be at most ${maxLength.requiredLength} characters long`;
    }
    return errorMessage;
  }

  private getJsonErrorMessage(errors: ValidationErrors): string {
    return JSON.stringify(errors);
  }
}
