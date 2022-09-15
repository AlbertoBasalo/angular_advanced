import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { HelperService } from "../services/helper.service";

@Component({
  selector: "app-contact",
  template: `
    <h1>📧 Get in contact</h1>
    <form [formGroup]="formGroup">
      <div>
        <label for="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          formControlName="name"
          [attr.aria-invalid]="isInvalid('name')"
        />
        <small *ngIf="mustShowError('name')">
          {{ getErrorMessage("name") }}
        </small>
      </div>
      <div>
        <label for="email">Your email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          formControlName="email"
          [attr.aria-invalid]="isInvalid('email')"
        />
        <small *ngIf="mustShowError('email')">
          {{ getErrorMessage("email") }}
        </small>
      </div>
      <div>
        <label for="message">Your message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          formControlName="message"
          [attr.aria-invalid]="isInvalid('message')"
        ></textarea>
        <small *ngIf="mustShowError('message')">
          {{ getErrorMessage("message") }}
        </small>
      </div>
      <button (click)="onSendClick()" [disabled]="formGroup.invalid">
        Send
      </button>
    </form>
  `,
  styles: [],
})
export class ContactPage {
  formGroup = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    message: new FormControl("Contact with me, please.", [
      Validators.maxLength(10),
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService
  ) {}

  isInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);
    if (control) {
      return control.invalid;
    }
    return true;
  }

  isTouched(controlName: string): boolean {
    const control = this.getControl(controlName);
    if (control) {
      return control.touched;
    }
    return true;
  }

  mustShowError = (controlName: string) =>
    this.isTouched(controlName) && this.isInvalid(controlName);

  getErrorMessage = (controlName: string) =>
    this.helper.getErrorMessage(this.formGroup, controlName);
  onSendClick = () => console.warn("Sending ", this.formGroup.value);
  getControl = (controlName: string) => this.formGroup.get(controlName);
}
