import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Agency } from "../models/agency.interface";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  agenciesUrl = `${environment.apiServerUrl}/agencies`;
  tripsUrl = `${environment.apiServerUrl}/trips`;

  constructor(private http: HttpClient) {}

  public getAgencies$(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.agenciesUrl);
  }

  public getAgencyById$(agencyId: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.agenciesUrl}/${agencyId}`);
  }

  public postAgency$(agency: Agency): Observable<Agency> {
    return this.http.post<Agency>(this.agenciesUrl, agency);
  }

  public deleteAgency$(agencyId: string): Observable<Agency> {
    return this.http.delete<Agency>(`${this.agenciesUrl}/${agencyId}`);
  }
}
