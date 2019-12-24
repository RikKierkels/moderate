import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class EntityByIdPipe<T> implements PipeTransform<number, Promise<T>> {
  repository: Repository<T>;

  constructor(
    private readonly entity: T,
    private readonly connection: Connection
  ) {
    this.repository = connection.getRepository<T>(() => entity);
  }

  async transform(id: number, metadata: ArgumentMetadata) {
    try {
      return await this.repository.findOneOrFail(id);
    } catch {
      throw new NotFoundException(`Cannot find the entity with id: ${id}.`);
    }
  }
}
