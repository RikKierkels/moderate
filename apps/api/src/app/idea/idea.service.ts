import { Injectable, NotFoundException } from '@nestjs/common';
import { Idea, IdeaCreateDto, IdeaUpdateDto } from '@moderate/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { IdeaEntity } from '../database/database-entities';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>
  ) {}

  // TODO: Repo returns IdeaEntity, map to Entity
  findAll(): Observable<Idea[]> {
    return from(this.ideaRepository.find());
  }

  // TODO: Repo returns IdeaEntity, map to Entity
  find(id: number): Observable<Idea> {
    return from(this.ideaRepository.findOneOrFail(id)).pipe(
      catchError(() => {
        throw new NotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );
  }

  // TODO: Repo returns IdeaEntity, map to Entity
  create(idea: IdeaCreateDto): Observable<Idea> {
    return from(this.ideaRepository.save(idea));
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
    // TODO: Move to a pipe later on
    const idea$ = from(this.ideaRepository.findOneOrFail(id)).pipe(
      catchError(() => {
        throw new NotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );

    idea$.pipe(switchMap(idea => this.ideaRepository.remove(idea)));
  }
}
