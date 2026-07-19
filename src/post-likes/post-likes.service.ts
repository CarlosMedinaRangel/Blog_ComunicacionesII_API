import { Injectable, Logger } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLike } from './entities/post-like.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { ReactionType } from 'src/interfaces/reactionTypes';
import { User } from 'src/auth/entities/auth.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class PostLikesService {
  private readonly logger = new Logger(PostLikesService.name);

  constructor(
    @InjectRepository(PostLike)
    private readonly PostLikeRespository: Repository<PostLike>,

    private readonly PostService: PostService,
    private readonly commonService: CommonService, // camelCase
  ) {}
  async toggle(postId: string, reaction: ReactionType, user: User) {
    await this.PostService.findOne(postId);

    const existing = await this.PostLikeRespository.findOne({
      where: {
        post: { id: postId },
        user: { id: user.id },
      },
    });

    if (!existing) {
      // Caso 1: no tenía reacción → creamos una nueva
      const like = this.PostLikeRespository.create({
        reaction,
        post: { id: postId },
        user,
      });
      await this.PostLikeRespository.save(like);
    } else if (existing.reaction === reaction) {
      // Caso 2: misma reacción → toggle off (quitamos el voto)
      await this.PostLikeRespository.remove(existing);
    } else {
      // Caso 3: reacción distinta → cambiamos like por dislike o viceversa
      existing.reaction = reaction;
      await this.PostLikeRespository.save(existing);
    }

    // Devolvemos los conteos actualizados
    return this.getCount(postId);
  }

  async getCount(postId: string) {
    // Una sola query con GROUP BY en vez de dos queries separadas
    const results = await this.PostLikeRespository.createQueryBuilder('like')
      .select('like.reaction', 'reaction')
      .addSelect('COUNT(*)', 'count')
      .where('like.post_id = :postId', { postId })
      .groupBy('like.reaction')
      .getRawMany<{ reaction: ReactionType; count: string }>();

    // Transformamos el array a un objeto { likes: N, dislikes: N }
    const counts = { likes: 0, dislikes: 0 };

    for (const row of results) {
      if (row.reaction === ReactionType.LIKE) {
        counts.likes = Number(row.count);
      } else {
        counts.dislikes = Number(row.count);
      }
    }

    return counts;
  }

  async getUserReaction(postId: string, user: User) {
    const like = await this.PostLikeRespository.findOne({
      where: {
        post: { id: postId },
        user: { id: user.id },
      },
    });

    return {
      reaction: like?.reaction ?? null,
    };
  }

  async DeleteALlPostLikes() {
    const query = this.PostLikeRespository.createQueryBuilder('comment');

    try {
      return await query.delete().where({}).execute();
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }
}
