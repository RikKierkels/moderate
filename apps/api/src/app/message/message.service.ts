import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity, MessageEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>
  ) {}
}
