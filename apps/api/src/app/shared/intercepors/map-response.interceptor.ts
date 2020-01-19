import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

type MapFn<T, R> = (data: T) => R;

@Injectable()
export class MapResponseInterceptor<T, R> implements NestInterceptor {
  mapFn: MapFn<T, R>;

  constructor(mapFn: MapFn<T, R>) {
    this.mapFn = mapFn;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<R | R[]> {
    return next.handle().pipe(
      map(data => {
        return Array.isArray(data) ? data.map(this.mapFn) : this.mapFn(data);
      })
    );
  }
}
