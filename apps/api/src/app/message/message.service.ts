import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { forkJoin, from, Observable } from 'rxjs';
import { IdeaService } from '../idea/idea.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Service } from '../shared/service.interface';
import { MessageCreateDto } from './models/message-create.dto';
import { MessageUpdateDto } from './models/message-update.dto';

@Injectable()
export class MessageService implements Service<MessageEntity> {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly ideaService: IdeaService,
    private readonly userService: UserService
  ) {}

  findById$(id: string): Observable<MessageEntity> {
    return from(
      this.repository.findOneOrFail(id, { where: { isDeleted: false } })
    ).pipe(
      catchError(() => {
        throw new NotFoundException(`Cannot find message with id: ${id}.`);
      })
    );
  }

  create$(
    messageToCreate: MessageCreateDto,
    userId: string
  ): Observable<MessageEntity> {
    return forkJoin([
      this.userService.findOrCreate$(userId),
      this.ideaService.findById$(messageToCreate.ideaId)
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

  update$(messageToUpdate: MessageUpdateDto): Observable<MessageEntity> {
    return from(
      this.repository.update(messageToUpdate.id, { text: messageToUpdate.text })
    ).pipe(switchMap(() => this.repository.findOne(messageToUpdate.id)));
  }

  delete(id: string): void {
    this.repository.update(id, { isDeleted: true });
  }
}
