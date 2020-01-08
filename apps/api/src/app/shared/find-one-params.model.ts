import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  readonly id: number;
}
