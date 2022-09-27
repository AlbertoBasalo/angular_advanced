export interface ComponentStatus {
  isDirty?: boolean;
  canDeactivate(): boolean;
}
