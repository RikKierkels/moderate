import { Observable } from 'rxjs';

export interface Service<T> {
  findById$(id: number): Observable<T>;
}
