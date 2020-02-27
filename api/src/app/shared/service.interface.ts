import { Observable } from 'rxjs';

export interface Service<T> {
  findById$(id: string): Observable<T>;
}
