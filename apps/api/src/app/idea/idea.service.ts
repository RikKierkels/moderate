import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IdeaEntity } from '../database/database-entities';
import { IdeaCreateDto, IdeaUpdateDto } from './idea.model';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';

@Injectable()
export class IdeaService {
  whereIdeaIsNotDeleted = { where: { isDeleted: false } };

  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>,
    private readonly tagService: TagService,
    private readonly userService: UserService
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

  create$(ideaToCreate: IdeaCreateDto, userId: string): Observable<IdeaEntity> {
    return forkJoin([
      this.userService.findOrCreate$(userId),
      this.tagService.findByIds$(ideaToCreate.tags)
    ]).pipe(
      switchMap(([user, tags]) => {
        const entity = this.ideaRepository.create({
          ...ideaToCreate,
          tags,
          author: user
        });
        return from(this.ideaRepository.save(entity));
      })
    );
  }

  update$(ideaUpdated: IdeaUpdateDto): Observable<IdeaEntity> {
    return this.tagService.findByIds$(ideaUpdated.tags).pipe(
      switchMap(tags => {
        const entity = this.ideaRepository.create({ ...ideaUpdated, tags });
        return from(this.ideaRepository.save(entity));
      }),
      switchMap(entity => this.ideaRepository.findOne(entity.id))
    );
  }

  delete(id: number): void {
    // TODO: Mark all linked messages as deleted.
    this.ideaRepository.update(id, { isDeleted: true });
  }
}
