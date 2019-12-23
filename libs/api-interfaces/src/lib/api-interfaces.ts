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
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @Column()
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
