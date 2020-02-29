import { Observable } from 'rxjs';

export type IsAuthorOfCheck = (id: string, sub: string) => Observable<boolean>;

export interface IsAuthorOfGuard {
  isAuthorOfCheck: IsAuthorOfCheck;
}
