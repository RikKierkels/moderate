import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Auth } from '../shared/decorators/auth.decorator';
import { UserId } from '../shared/decorators/user.decorator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IsAuthorOfMessageGuard } from '../shared/guards/is-author-of.guard';
import { MessageService } from './message.service';
import { FindOneParams } from '../shared/find-one-params.model';
import { MessageDto } from './models/message.dto';
import { MessageCreateDto } from './models/message-create.dto';
import { MessageUpdateDto } from './models/message-update.dto';

@ApiTags('Message')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiResponse({ type: MessageDto })
  @Auth()
  @Post()
  create(
    @Body() messageToCreate: MessageCreateDto,
    @UserId() userId: string
  ): Observable<MessageDto> {
    return this.messageService
      .create$(messageToCreate, userId)
      .pipe(map(message => MessageDto.fromEntity(message)));
  }

  @ApiResponse({ type: MessageDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfMessageGuard)
  @Put()
  update(@Body() messageToUpdate: MessageUpdateDto): Observable<MessageDto> {
    return this.messageService
      .update$(messageToUpdate)
      .pipe(map(message => MessageDto.fromEntity(message)));
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfMessageGuard)
  @Delete(':id')
  delete(@Param() params: FindOneParams): void {
    this.messageService.delete(params.id);
  }
}
