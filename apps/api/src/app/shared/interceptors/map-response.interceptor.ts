import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type MapFunction<T, R> = (data: T) => R;

@Injectable()
export class MapResponseInterceptor<T, R> implements NestInterceptor {
  mapFunction: MapFunction<T, R>;

  constructor(mapFn: MapFunction<T, R>) {
    this.mapFunction = mapFn;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<R | R[]> {
    return next.handle().pipe(
      map(data => {
        return Array.isArray(data)
          ? data.map(this.mapFunction)
          : this.mapFunction(data);
      })
    );
  }
}
