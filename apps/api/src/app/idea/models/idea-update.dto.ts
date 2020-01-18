import { IdeaCreateDto } from './idea-create-dto.model';
import { IdeaUpdate } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IdeaUpdateDto extends IdeaCreateDto implements IdeaUpdate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
