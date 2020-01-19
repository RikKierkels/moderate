import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageService } from '../../message/message.service';
import { map } from 'rxjs/operators';
import { IdeaEntity, MessageEntity } from '../../database/database-entities';
import { IdeaService } from '../../idea/idea.service';
import { Service } from '../service.interface';
import {
  IsAuthorOfCheck,
  IsAuthorOfGuard
} from './is-author-of-guard.interface';

@Injectable()
export class IsAuthorOfMessageGuard implements CanActivate, IsAuthorOfGuard {
  isAuthorOfCheck: IsAuthorOfCheck;

  constructor(private readonly messageService: MessageService) {
    this.isAuthorOfCheck = isAuthorOfEntity<MessageEntity>(messageService);
  }

  canActivate(context: ExecutionContext): Observable<boolean> {
    const { body, params, user } = context.switchToHttp().getRequest();
    return this.isAuthorOfCheck(body.id || params.id, user.sub);
  }
}

@Injectable()
export class IsAuthorOfIdeaGuard implements CanActivate, IsAuthorOfGuard {
  isAuthorOfCheck: IsAuthorOfCheck;

  constructor(private readonly ideaService: IdeaService) {
    this.isAuthorOfCheck = isAuthorOfEntity<IdeaEntity>(ideaService);
  }

  canActivate(context: ExecutionContext): Observable<boolean> {
    const { body, params, user } = context.switchToHttp().getRequest();
    return this.isAuthorOfCheck(body.id || params.id, user.sub);
  }
}

function isAuthorOfEntity<T extends { author: { id: string } }>(
  service: Service<T>
): IsAuthorOfCheck {
  return (id: string, sub: string): Observable<boolean> => {
    return service.findById$(id).pipe(map(entity => entity.author.id === sub));
  };
}
