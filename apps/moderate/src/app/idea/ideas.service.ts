import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Idea, Ideas } from '@moderate/api-interfaces';
import { Environment } from '../shared/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  baseUrl = `${this.environment.API_BASE_URL}/ideas`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment
  ) {}

  getAll(): Observable<Ideas> {
    return this.httpClient
      .get<Ideas>(this.baseUrl)
      .pipe(catchError(() => of([])));
  }

  create(idea: Idea): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl, idea);
  }
}
