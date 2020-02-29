import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly text: string;
}
