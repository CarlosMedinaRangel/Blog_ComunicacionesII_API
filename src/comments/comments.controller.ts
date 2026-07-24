import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/auth/Decorators/get-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  @Auth()
  create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.create(postId, createCommentDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.commentsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @Get(':postId/comments')
  findByPost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.commentsService.findByPost(postId, paginationDto);
  }

  // GET /posts/:postId/comments/:id/replies
  @Get(':id/replies')
  findReplies(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findReplies(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.commentsService.remove(id, user);
  }
}
