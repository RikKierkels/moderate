import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IdeaEntity } from '../database/database-entities';
import { IdeaCreateDto, IdeaUpdateDto } from './idea.model';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';

@Injectable()
export class IdeaService {
  whereIsNotDeleted = { where: { isDeleted: false } };

  constructor(
    @InjectRepository(IdeaEntity)
    private readonly repository: Repository<IdeaEntity>,
    private readonly tagService: TagService,
    private readonly userService: UserService
  ) {}

  findAll$(): Observable<IdeaEntity[]> {
    return from(this.repository.find({ ...this.whereIsNotDeleted }));
  }

  find$(id: number): Observable<IdeaEntity> {
    return from(
      this.repository.findOneOrFail(id, { ...this.whereIsNotDeleted })
    ).pipe(
      catchError(() => {
        throw new NotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );
  }

  create$(ideaToCreate: IdeaCreateDto, userId: string): Observable<IdeaEntity> {
    return forkJoin([
      this.userService.findOrCreate$(userId),
      this.tagService.findByIds$(ideaToCreate.tags)
    ]).pipe(
      map(([user, tags]) => {
        return this.repository.create({
          ...ideaToCreate,
          tags,
          author: user
        });
      }),
      switchMap(ideaEntity => {
        return this.repository.save(ideaEntity);
      })
    );
  }

  update$(ideaToUpdate: IdeaUpdateDto): Observable<IdeaEntity> {
    return this.tagService.findByIds$(ideaToUpdate.tags).pipe(
      map(tags => this.repository.create({ ...ideaToUpdate, tags })),
      switchMap(ideaEntity => this.repository.save(ideaEntity)),
      switchMap(ideaEntity => this.repository.findOne(ideaEntity.id))
    );
  }

  delete$(id: number): Observable<IdeaEntity> {
    return this.find$(id).pipe(
      map(ideaEntity => {
        const messages = ideaEntity.messages.map(message => ({
          ...message,
          isDeleted: true
        }));
        return { ...ideaEntity, messages, isDeleted: true };
      }),
      switchMap(ideaEntity => this.repository.save(ideaEntity))
    );
  }
}
