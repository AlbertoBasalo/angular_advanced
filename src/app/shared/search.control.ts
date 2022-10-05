import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  of,
} from "rxjs";

@Component({
  selector: "app-search-control",
  template: `
    <input #searchInput type="search" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchControl implements AfterViewInit {
  @Output() search = new EventEmitter<string>();
  @Output() search$: Observable<string> = of("");
  @ViewChild("searchInput", { static: true }) searchInput!: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    // this.search$ = this.getSearchTerm$();
    this.getSearchTerm$().subscribe((searchTerm: string) => {
      this.search.emit(searchTerm);
    });
  }

  private getSearchTerm$() {
    const searchSource$ = fromEvent(this.searchInput.nativeElement, "keyup");
    return searchSource$.pipe(
      debounceTime(500),
      map((event: any) => event.target.value),
      filter((searchTerm: string) => searchTerm.length > 2),
      distinctUntilChanged()
    );
  }
}
