import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { forkJoin, Observable } from 'rxjs';
import { MessageCreateDto } from './message.model';
import { IdeaService } from '../idea/idea.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly ideaService: IdeaService,
    private readonly userService: UserService
  ) {}

  create$(
    ideaId: number,
    userId: string,
    messageToCreate: MessageCreateDto
  ): Observable<MessageEntity> {
    return forkJoin([
      this.userService.findOrCreate$(userId),
      this.ideaService.findById$(ideaId)
    ]).pipe(
      map(([user, idea]) => {
        return this.repository.create({
          ...messageToCreate,
          idea,
          author: user
        });
      }),
      switchMap(messageEntity => this.repository.save(messageEntity))
    );
  }
}
