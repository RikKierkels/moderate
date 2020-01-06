import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Observable } from 'rxjs';
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  IdeaCreateDto,
  IdeaDto,
  IdeaUpdateDto,
  IdeaWithMessagesDto
} from './idea.model';
import { Auth } from '../shared/decorators/auth.decorator';
import { IsAuthorOfIdeaGuard } from '../shared/guards/is-author-of-idea-guard';
import { UserId } from '../shared/decorators/user.decorator';
import { first, map } from 'rxjs/operators';
import {
  MessageCreateDto,
  MessageDto,
  MessageUpdateDto
} from '../message/message.model';
import { MessageService } from '../message/message.service';
import { IsAuthorOfMessageGuard } from '../shared/guards/is-author-of-message.guard';

@ApiTags('Idea')
@Controller('ideas')
export class IdeaController {
  constructor(
    private readonly ideaService: IdeaService,
    private readonly messageService: MessageService
  ) {}

  @ApiResponse({ type: [IdeaDto] })
  @Get()
  public findIdeas(): Observable<IdeaDto[]> {
    return this.ideaService
      .findAll$()
      .pipe(map(ideas => ideas.map(idea => IdeaDto.fromEntity(idea))));
  }

  @ApiResponse({ type: IdeaWithMessagesDto })
  @ApiNotFoundResponse()
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  findIdea(@Param('id') id: number): Observable<IdeaWithMessagesDto> {
    return this.ideaService
      .findById$(id)
      .pipe(map(idea => IdeaWithMessagesDto.fromEntity(idea)));
  }

  @ApiResponse({ type: IdeaDto })
  @Auth()
  @Post()
  createIdea(
    @Body() ideaToCreate: IdeaCreateDto,
    @UserId() userId: string
  ): Observable<IdeaDto> {
    return this.ideaService
      .create$(ideaToCreate, userId)
      .pipe(map(idea => IdeaDto.fromEntity(idea)));
  }

  @ApiResponse({ type: IdeaDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @Put()
  updateIdea(@Body() ideaToUpdate: IdeaUpdateDto): Observable<IdeaDto> {
    return this.ideaService
      .update$(ideaToUpdate)
      .pipe(map(idea => IdeaDto.fromEntity(idea)));
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @Delete(':id')
  deleteIdea(@Param('id') id: number): void {
    this.ideaService
      .delete$(id)
      .pipe(first())
      .subscribe();
  }

  @ApiResponse({ type: MessageDto })
  @Auth()
  @Post(':id/messages')
  createMessage(
    @Param('id') ideaId: number,
    @UserId() userId: string,
    @Body() messageToCreate: MessageCreateDto
  ): Observable<MessageDto> {
    return this.messageService
      .create$(ideaId, userId, messageToCreate)
      .pipe(map(message => MessageDto.fromEntity(message)));
  }

  @ApiResponse({ type: MessageDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfMessageGuard)
  @Put(':id/messages')
  updateMessage(
    @Body() messageToUpdate: MessageUpdateDto
  ): Observable<MessageDto> {
    return this.messageService
      .update$(messageToUpdate)
      .pipe(map(message => MessageDto.fromEntity(message)));
  }

  @ApiResponse({ type: MessageDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfMessageGuard)
  @Delete(':ideaId/messages/:messageId')
  deleteMessage(@Param('messageId') id: number): void {
    this.messageService.delete(id);
  }
}
