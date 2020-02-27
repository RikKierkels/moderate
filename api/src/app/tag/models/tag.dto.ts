import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;
}
