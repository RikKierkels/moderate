import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { TagDto } from './tag.model';
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

  findAll(): Observable<TagEntity[]> {
    return from(this.repository.find());
  }
}
