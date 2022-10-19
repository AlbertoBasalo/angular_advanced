// ! synchronous store
// class Store<T> {
//   private state: T;
//   constructor(initialState: T) {
//     this.state = initialState;
//   }
//   setState(newState: T) {
//     this.state = newState;
//   }
//   getState(): T {
//     return this.state;
//   }
// }

import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

// ! asynchronous store with observable
// class Store<T> {
//   private state$: BehaviorSubject<T>;
//   constructor(initialState: T) {
//     this.state$ = new BehaviorSubject(initialState);
//   }
//   setState(newState: T) {
//     this.state$.next(newState);
//   }
//   getState(): T {
//     return this.state$.getValue();
//   }
//   getState$(): Observable<T> {
//     return this.state$.asObservable();
//   }
// }

// ! asynchronous protected store with clones
// class Store<T> {
//   private state$: BehaviorSubject<T>;
//   constructor(initialState: T) {
//     this.state$ = new BehaviorSubject(this.clone(initialState));
//   }
//   setState(newState: T) {
//     this.state$.next(this.clone(newState));
//   }
//   getState(): T {
//     return this.clone(this.state$.getValue());
//   }
//   getState$() {
//     return this.state$.asObservable().pipe(map(this.clone));
//   }
//   private clone<K>(target: K): K {
//     return JSON.parse(JSON.stringify(target));
//   }
// }

// ! asynchronous partial store
class Store<T> {
  private state$: BehaviorSubject<T>;
  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }
  setState(mutation: Partial<T>) {
    const newState = { ...this.getState(), ...this.clone(mutation) };
    this.state$.next(newState);
  }
  select$<K>(selector: (state: T) => K): Observable<K> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  getState(): T {
    return this.clone(this.state$.getValue());
  }
  getState$(): Observable<T> {
    return this.state$.asObservable().pipe(map(this.clone));
  }
  private clone<K>(target: K): K {
    return JSON.parse(JSON.stringify(target));
  }
}
