import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "agencyStatus",
})
export class AgencyStatusPipe implements PipeTransform {
  transform(status: string, ...args: unknown[]): string {
    return status.toLowerCase();
  }
}
