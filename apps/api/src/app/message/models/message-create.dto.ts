import { MessageCreate } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageCreateDto implements MessageCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ideaId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly text: string;
}
