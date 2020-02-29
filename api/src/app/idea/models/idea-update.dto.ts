import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IdeaCreateDto } from './idea-create.dto';

export class IdeaUpdateDto extends IdeaCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
