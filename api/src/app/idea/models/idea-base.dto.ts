import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from '../../tag/models/tag.dto';
import { UserDto } from '../../user/models/user.dto';

export class IdeaBaseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly difficulty: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly tags: TagDto[];

  @ApiProperty()
  readonly author: UserDto;
}
