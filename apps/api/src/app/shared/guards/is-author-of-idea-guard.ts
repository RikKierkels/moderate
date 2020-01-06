import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IdeaService } from '../../idea/idea.service';
import { map } from 'rxjs/operators';

@Injectable()
export class IsAuthorOfIdeaGuard implements CanActivate {
  constructor(private readonly ideaService: IdeaService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const { body, params, user } = context.switchToHttp().getRequest();

    return this.ideaService
      .findById$(body.id || params.id)
      .pipe(map(idea => idea.author.id === user.sub));
  }
}
