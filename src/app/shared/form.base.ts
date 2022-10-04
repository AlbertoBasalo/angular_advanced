import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidationService } from "../services/validation.service";

export class FormBase {
  formGroup!: FormGroup;

  constructor(protected validation: ValidationService) {}

  getControl(controlName: string): AbstractControl | null {
    if (controlName === "form") {
      return this.formGroup;
    }
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
}
