import { Observable } from 'rxjs';

export interface IsAuthorOfGuard {
  isAuthorOfFn: (id: string, sub: string) => Observable<boolean>;
}
