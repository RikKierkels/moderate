import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Idea } from '@moderate/api-interfaces';
import { Environment } from '../shared/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  baseUrl = `${this.environment.API_BASE_URL}/ideas`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment
  ) {}

  getAll(): Observable<Idea[]> {
    return this.httpClient
      .get<Idea[]>(this.baseUrl)
      .pipe(catchError(() => of([])));
  }

  create(idea: Idea): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl, idea);
  }
}
