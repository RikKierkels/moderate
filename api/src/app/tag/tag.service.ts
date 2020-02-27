import { Injectable, NotFoundException } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { map } from 'rxjs/operators';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>
  ) {}

  findAll$(): Observable<TagEntity[]> {
    return from(this.repository.find());
  }

  findByIds$(ids: string[]): Observable<TagEntity[]> {
    return from(this.repository.findByIds(ids)).pipe(
      map(tags => {
        if (tags.length !== ids.length) {
          throw new NotFoundException(
            `One or more tags with Ids: ${ids.join(', ')} could not be found.`
          );
        }

        return tags;
      })
    );
  }
}
