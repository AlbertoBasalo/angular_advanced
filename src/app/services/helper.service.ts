import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  getIdFromRoute(route: ActivatedRoute, param = "id"): string {
    return route.snapshot.paramMap.get(param) || "";
  }

  getErrorMessage(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    if (control && control.errors) {
      return JSON.stringify(control.errors);
    }
    return "";
  }
}
