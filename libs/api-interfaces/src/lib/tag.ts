import { ApiProperty } from '@nestjs/swagger';

export class Tag {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;
}
