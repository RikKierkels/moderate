import { Observable } from 'rxjs';

export interface IsAuthorOfGuard {
  isAuthorOfFn: (id: number, sub: string) => Observable<boolean>;
}
