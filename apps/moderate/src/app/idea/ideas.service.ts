import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ideas } from '@moderate/api-interfaces';
import { Environment } from '../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  constructor(
    private httpClient: HttpClient,
    private environment: Environment
  ) {}

  getALl(): Observable<Ideas> {
    return this.httpClient.get<Ideas>(`${this.environment.API_BASE_URL}/ideas`);
  }
}
