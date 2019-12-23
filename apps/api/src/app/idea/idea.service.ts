import { Injectable, NotFoundException } from '@nestjs/common';
import { Idea, IdeaCreateDto, IdeaUpdateDto } from '@moderate/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
        throw new NotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );
  }

  create(idea: IdeaCreateDto): void {
    this.ideaRepository.create(idea);
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
    from(this.ideaRepository.delete(id)).pipe(
      catchError(() => {
        // TODO: Split into multiple exception types
        throw new NotFoundException(
          `Cannot find idea with id: ${id} to delete.`
        );
      })
    );
  }
}
