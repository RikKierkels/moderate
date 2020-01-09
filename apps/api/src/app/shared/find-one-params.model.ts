import { IsString } from 'class-validator';

export class FindOneParams {
  @IsString()
  readonly id: string;
}
