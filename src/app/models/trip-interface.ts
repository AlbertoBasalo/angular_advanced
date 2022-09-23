export interface Trip {
  id: string;
  agencyId: string;
  agencyTripCode: string;
  destination: string;
  places: number;
  startDate: string;
  endDate: string;
  flightPrice: number;
  stayingNightPrice: number;
  kind: string;
  status: string;
  extraLuggagePricePerKilo: number;
  premiumFoodPrice: number;
}
