import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pipe,
} from "rxjs";

@Component({
  selector: "app-search-control",
  template: `
    <input #searchInput type="search" placeholder="Search" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchControl implements AfterViewInit {
  @Output() search = new EventEmitter<string>();
  @ViewChild("searchInput", { static: true }) searchInput!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const searchableTerm$ = this.createSearchableTerm$();
    searchableTerm$.subscribe(this.onSearchTerm.bind(this));
  }

  private createSearchableTerm$() {
    const searchSource$ = fromEvent(this.searchInput.nativeElement, "input");
    return searchSource$.pipe(eventToSearchAdapter);
  }

  private onSearchTerm(searchTerm: string) {
    this.search.emit(searchTerm); // emit to parent using @Output
    this.useUrlSearchTerm(searchTerm); // change url query params
  }

  private useUrlSearchTerm(searchTerm: string) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { q: searchTerm },
      queryParamsHandling: "merge",
      preserveFragment: true,
    });
    this.router.navigateByUrl(urlTree);
  }
}

const toValue = (event: any) => event.target.value;
const byLength = (searchTerm: string) => searchTerm.length >= 1;
const eventToSearchAdapter = pipe(
  debounceTime(500),
  map(toValue),
  filter(byLength),
  distinctUntilChanged()
);
