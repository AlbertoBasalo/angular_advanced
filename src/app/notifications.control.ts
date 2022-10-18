import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ErrorMediatorService } from "./services/error-mediator.service";

@Component({
  selector: "app-notifications",
  template: `
    <span [attr.aria-busy]="busy">{{ icon }} {{ message }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NotificationsControl {
  busy = false;
  icon = "🔔";
  message = "Notifications ready";
  private errorMediator: ErrorMediatorService = inject(ErrorMediatorService);

  constructor() {
    this.errorMediator.error$.subscribe({
      next: (appError) => {
        this.icon = "💣";
        this.message = appError.message;
        this.busy = false;
      },
    });
  }
}
