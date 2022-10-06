import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Agency } from "../models/agency.interface";
import { Trip } from "../models/trip.interface";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  private agenciesUrl = `${environment.apiServerUrl}/agencies`;
  private tripsUrl = `${environment.apiServerUrl}/trips`;

  constructor(private http: HttpClient) {}

  getAgencies$(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.agenciesUrl);
  }

  getAgencyById$(agencyId: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.agenciesUrl}/${agencyId}`);
  }

  postAgency$(agency: Agency): Observable<Agency> {
    return this.http.post<Agency>(this.agenciesUrl, agency);
  }

  deleteAgency$(agencyId: string): Observable<Agency> {
    return this.http.delete<Agency>(`${this.agenciesUrl}/${agencyId}`);
  }

  getTrips$(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getTripsByAgencyId$(agencyId: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripsUrl}?agencyId=${agencyId}`);
  }
  getTripsByQuery$(query: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.tripsUrl}?q=${query}`);
  }
}
