import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <app-search-control (search)="onSearch($event)"></app-search-control>
    <pre> Searching for: {{ searchTerm }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchTerm = "";
  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    console.log("Searching for", this.searchTerm);
  }
}
