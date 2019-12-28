import { Injectable, PipeTransform } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IdeaService } from '../../idea/idea.service';
import { IdeaEntity } from '../../database/database-entities';

@Injectable()
export class IdeaByIdPipe
  implements PipeTransform<number, Observable<IdeaEntity>> {
  constructor(private readonly ideaService: IdeaService) {}

  transform(id: number): Observable<IdeaEntity> {
    return this.ideaService.find(id);
  }
}
