import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Agency } from "src/app/models/agency.interface";
import { ApiService } from "src/app/services/api.service";

@Injectable({
  providedIn: "root",
})
export class AgenciesViewResolver implements Resolve<Agency> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Agency> {
    const agencyId = route.paramMap.get("id") || "";
    return this.api.getAgencyById$(agencyId);
  }
}
