import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <app-search-control
      (search)="onSearch($event)"
      (search$)="onSearch$($event)"
    ></app-search-control>
    <pre> s: {{ searchTerm }}</pre>
    <pre> s$ : {{ searchTerm$ }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  searchTerm = "";
  searchTerm$ = "";
  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    console.log(this.searchTerm);
  }
  onSearch$(searchTerm: string) {
    this.searchTerm$ = searchTerm;
    console.log(this.searchTerm$);
  }
}
