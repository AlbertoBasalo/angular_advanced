import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "agenciesHeader",
})
export class AgenciesHeaderPipe implements PipeTransform {
  transform(agencies: any[], ...args: unknown[]): string {
    const header = `We work with ${agencies.length} agencies`;
    console.log("🪠 pipe header", header);
    return header;
  }
}
