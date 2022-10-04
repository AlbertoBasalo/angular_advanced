import { AbstractControl } from "@angular/forms";
import { ValidationService } from "../services/validation.service";

export class ControlBase {
  control!: AbstractControl | null;
  constructor(protected validation: ValidationService) {}
  hasError(): boolean {
    return this.control?.invalid || false;
  }
  mustShowError(): boolean {
    return this.validation.mustShowMessage(this.control);
  }
  getErrorMessage(): string {
    return this.validation.getErrorMessage(this.control);
  }
}
