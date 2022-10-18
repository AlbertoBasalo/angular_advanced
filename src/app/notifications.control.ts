import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthenticationStore } from "./auth/authentication.store";
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
  private authenticationStore: AuthenticationStore =
    inject(AuthenticationStore);
  constructor() {
    this.errorMediator.error$.subscribe({
      next: (appError) => {
        this.icon = "💣";
        this.message = appError.message;
        this.busy = false;
      },
    });
    this.authenticationStore.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.icon = "🔒";
        this.message = isAuthenticated
          ? "You are authenticated"
          : "You are not authenticated";
        this.busy = false;
      },
    });
  }
}
