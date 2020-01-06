import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageService } from '../../message/message.service';
import { map } from 'rxjs/operators';

// TODO: Merge with Idea Guard to be DRY.
@Injectable()
export class IsAuthorOfMessageGuard implements CanActivate {
  constructor(private readonly messageService: MessageService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const { body, params, user } = context.switchToHttp().getRequest();

    return this.messageService
      .findById$(body.id || params.messageId)
      .pipe(map(idea => idea.author.id === user.sub));
  }
}
