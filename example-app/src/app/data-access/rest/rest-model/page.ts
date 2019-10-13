export interface Page<T> {
  content: T[];
  prev?: number;
  next?: number;
  first?: number;
  last?: number;
}
