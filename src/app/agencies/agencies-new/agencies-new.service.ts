import { Injectable } from "@angular/core";
import { Agency } from "src/app/models/agency.interface";
import { ApiService } from "src/app/services/api.service";

@Injectable({
  providedIn: "root",
})
export class AgenciesNewService {
  constructor(private api: ApiService) {}

  saveAgency(formValue: Omit<Agency, "id">) {
    const id = this.createAgencyId(formValue.name);
    const agency = { id, ...formValue };
    return this.api.postAgency$(agency);
  }

  createAgencyId(name: string = ""): string {
    return name.toLowerCase().replace(" ", "-");
  }
}
