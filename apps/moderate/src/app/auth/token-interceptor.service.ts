import { Inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { UNAUTHORIZED_ENDPOINTS } from './unauthorized-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    @Inject(UNAUTHORIZED_ENDPOINTS)
    private unauthorizedEndpoints: { [key: string]: string[] },
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isEndpointUnauthorized = this.unauthorizedEndpoints[req.method].some(
      endpoint => req.url.endsWith(endpoint)
    );

    if (isEndpointUnauthorized) return next.handle(req);

    return this.authService.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}
