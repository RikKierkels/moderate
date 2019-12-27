import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IdeaEntity } from '../database/database-entities';
import { IdeaCreateDto, IdeaDto, IdeaUpdateDto } from './idea.model';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideaRepository: Repository<IdeaEntity>
  ) {}

  findAll(): Observable<IdeaDto[]> {
    return from(this.ideaRepository.find());
  }

  find(id: number): Observable<IdeaEntity> {
    return from(this.ideaRepository.findOneOrFail(id)).pipe(
      catchError(() => {
        throw new NotFoundException(`Cannot find idea with id: ${id}.`);
      })
    );
  }

  create(idea: IdeaCreateDto): Observable<IdeaDto> {
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

  delete(idea: IdeaEntity): void {
    this.ideaRepository.remove(idea);
  }
}
