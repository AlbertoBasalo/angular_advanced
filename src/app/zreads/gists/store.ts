import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

/**
 * A generic class to manage state in an asynchronous way.
 */
class Store<T> {
  /**
   * @private field to store and notify state changes
   * BehaviorSubject is a special type of Observable
   * that keeps hold of the current value
   * and emits it to any new subscribers
   */
  private state$: BehaviorSubject<T>;

  /**
   * Creates a typed store to hold the state
   * @param initialState: T - the initial value for the state
   */
  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }

  /**
   * changes the state value
   * @param mutation: Partial<T> - the new value for the state
   * could be a partial of the state to change only some properties
   * @returns void
   */
  setState(mutation: Partial<T>) {
    const newState = { ...this.getState(), ...this.clone(mutation) };
    this.state$.next(newState);
  }
  /**
   * also known as a snapshot
   * @returns T - a copy of the current state value
   */
  getState(): T {
    return this.clone(this.state$.getValue());
  }
  /**
   * emits copies of the state value on each change
   * @returns Observable<T> - an observable of the state
   */
  getState$(): Observable<T> {
    return this.state$.asObservable().pipe(map(this.clone));
  }
  /**
   * notifies changes on selected properties of the state
   * @param selector: (state: T) => K - a function that selects a slice of the state
   * @returns Observable<K> - an observable of the state projected by the selector
   */
  select$<K>(selector: (state: T) => K): Observable<K> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  /**
   * simplest generic method to deep clone any object
   * could be improved to be more efficient
   * @param target: K - the object to clone
   * @returns K - a copy of the target
   */
  private clone<K>(target: K): K {
    return JSON.parse(JSON.stringify(target));
  }
}
