import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IdeaService } from '../../idea/idea.service';
import { map } from 'rxjs/operators';

@Injectable()
export class IsAuthorGuard implements CanActivate {
  constructor(private readonly ideaService: IdeaService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const { user, params } = context.switchToHttp().getRequest();

    return this.ideaService
      .find$(params.id)
      .pipe(map(idea => idea.id === user.sub));
  }
}
