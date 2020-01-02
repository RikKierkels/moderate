import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { TagDto } from './tag.model';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>
  ) {}

  findAll(): Observable<TagDto[]> {
    return from(this.repository.find());
  }
}
