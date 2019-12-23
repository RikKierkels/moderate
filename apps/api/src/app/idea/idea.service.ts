import { Injectable } from '@nestjs/common';
import { Idea } from '@moderate/api-interfaces';
import { IdeaNotFoundException } from '../shared/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { catchError, throwIfEmpty } from 'rxjs/operators';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea)
    private readonly ideaRepository: Repository<Idea>
  ) {}

  findAll(): Observable<Idea[]> {
    return from(this.ideaRepository.find());
  }

  find(id: number): Observable<Idea> {
    return from(this.ideaRepository.findOneOrFail(id)).pipe(
      catchError(() => {
        throw new IdeaNotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );
  }

  create(idea: Idea): void {
    this.ideaRepository.create(idea);
  }

  update(updateIdea: Idea): void {
    from(this.ideaRepository.update(updateIdea.id, updateIdea)).pipe(
      catchError(() => {
        throw new IdeaNotFoundException(
          `Cannot find idea with id: ${updateIdea.id} to update.`
        );
      })
    );
  }

  delete(id: number): void {
    from(this.ideaRepository.delete(id)).pipe(
      catchError(() => {
        throw new IdeaNotFoundException(
          `Cannot find idea with id: ${id} to delete.`
        );
      })
    );
  }
}
