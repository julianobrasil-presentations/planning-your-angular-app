export interface Page<T> {
  content: T[];
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
}
