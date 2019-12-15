import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator';

export class Idea {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @Min(0)
  @Max(5)
  readonly difficulty: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  tags: string[];
}

export class Ideas {
  [key: number]: Idea;
}
