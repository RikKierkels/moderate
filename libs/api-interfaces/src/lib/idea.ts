import { Message, Tag } from '@moderate/api-interfaces';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Idea {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly difficulty: number;

  @ApiProperty()
  readonly tags: Tag[];

  @ApiProperty()
  readonly replies: Message[];

  @ApiProperty()
  readonly authorId: string;
}

export class IdeaCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly difficulty: number;

  @ApiProperty()
  @ArrayNotEmpty({ each: true })
  @ArrayUnique({ each: true })
  readonly tags: Tag[];
}

export class IdeaUpdateDto extends IdeaCreateDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  readonly id: number;
}
