import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  IdeaEntity,
  TagEntity,
  UserEntity
} from '../database/database-entities';
import { IdeaCreateDto, IdeaUpdateDto } from './idea.model';

@Injectable()
export class IdeaService {
  whereIdeaIsNotDeleted = { where: { isDeleted: false } };

  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  findAll$(): Observable<IdeaEntity[]> {
    return from(this.ideaRepository.find({ ...this.whereIdeaIsNotDeleted }));
  }

  find$(id: number): Observable<IdeaEntity> {
    return from(
      this.ideaRepository.findOneOrFail(id, { ...this.whereIdeaIsNotDeleted })
    ).pipe(
      catchError(() => {
        throw new NotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );
  }

  create$(idea: IdeaCreateDto, userId: string): Observable<IdeaEntity> {
    return forkJoin([this.user$(userId), this.tags$(idea.tags)]).pipe(
      switchMap(([user, tags]) => {
        const entity = this.ideaRepository.create({
          ...idea,
          tags,
          author: user
        });
        return from(this.ideaRepository.save(entity));
      })
    );
  }

  // TODO: Move to tag service
  private tags$(tagIds: number[]): Observable<TagEntity[]> {
    return from(this.tagRepository.findByIds(tagIds));
  }

  // TODO: Move to user service
  private user$(userId: string): Observable<UserEntity> {
    return from(this.userRepository.findOne(userId)).pipe(
      switchMap(user =>
        user ? of(user) : from(this.userRepository.save({ id: userId }))
      )
    );
  }

  update(updateIdea: IdeaUpdateDto): void {
    from(this.ideaRepository.update(updateIdea.id, updateIdea)).pipe(
      catchError(() => {
        // TODO: Split into multiple exception types
        throw new NotFoundException(
          `Cannot find idea with id: ${updateIdea.id} to update.`
        );
      })
    );
  }

  delete(id: number): void {
    // TODO: Mark all linked messages as deleted.
    this.ideaRepository.update(id, { isDeleted: true });
  }
}
