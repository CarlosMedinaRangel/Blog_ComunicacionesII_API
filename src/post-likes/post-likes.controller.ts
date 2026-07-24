import { Controller, Get, Post, Param, ParseUUIDPipe } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';

import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { GetUser } from 'src/auth/Decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { ReactionType } from 'src/interfaces/reactionTypes';

@ApiBearerAuth()
@Controller('likes/posts')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  // POST /posts/:postId/like  → dar like (o quitarlo si ya lo tenía)
  @Post(':postid/like')
  @Auth()
  @ApiOperation({ summary: 'Dar like a un post (toggle)' })
  like(@Param('postid', ParseUUIDPipe) postid, @GetUser() user: User) {
    return this.postLikesService.toggle(postid, ReactionType.LIKE, user);
  }

  // POST /posts/:postId/dislike  → dar dislike (o quitarlo si ya lo tenía)
  @Post(':postid/dislike')
  @Auth()
  @ApiOperation({ summary: 'Dar dislike a un post (toggle)' })
  dislike(@Param('postid', ParseUUIDPipe) postid, @GetUser() user: User) {
    return this.postLikesService.toggle(postid, ReactionType.DISLIKE, user);
  }

  // GET /posts/:postId/likes  → obtener conteo de likes y dislikes
  @Get(':postid/likes')
  @ApiOperation({ summary: 'Obtener conteo de likes y dislikes de un post' })
  getCount(@Param('postid', ParseUUIDPipe) postid) {
    return this.postLikesService.getCount(postid);
  }

  // GET /posts/:postId/my-reaction  → saber la reacción del usuario actual
  @Get(':postid/my-reaction')
  @Auth()
  @ApiOperation({
    summary: 'Obtener la reacción del usuario actual en un post',
    description: 'Devuelve { reaction: "like" | "dislike" | null }',
  })
  @ApiParam({ name: 'postid', type: 'string', format: 'uuid' })
  getUserReaction(
    @Param('postid', ParseUUIDPipe) postid,
    @GetUser() user: User,
  ) {
    return this.postLikesService.getUserReaction(postid, user);
  }
}
