// src/seed/seed.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/entities/auth.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommentsService } from 'src/comments/comments.service';
import { PostLikesService } from 'src/post-likes/post-likes.service';
import { PostService } from 'src/post/post.service';
import { initialData } from './data/Seed-Data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentsService,
    private readonly postLikeService: PostLikesService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const users = await this.insertUsers();
    const posts = await this.insertPosts(users);
    await this.insertComments(users, posts);

    return {
      message: `Seed ejecutado: ${users.length} usuarios, ${posts.length} posts, ${initialData.comments.length} hilos de comentarios`,
    };
  }

  // ── Limpiar tablas en orden (hijos primero, padres al final) ───────────────

  private async deleteTables() {
    await this.postLikeService.DeleteALlPostLikes();
    await this.commentService.DeleteALlcomments();
    await this.postService.DeleteALlPost();
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
    this.logger.log('Tablas limpiadas');
  }

  // ── Usuarios ───────────────────────────────────────────────────────────────

  private async insertUsers(): Promise<User[]> {
    const userEntities = initialData.users.map((u) =>
      this.userRepository.create(u),
    );
    const saved = await this.userRepository.save(userEntities);
    this.logger.log(`${saved.length} usuarios insertados`);
    return saved;
  }

  // ── Posts con usuario aleatorio ────────────────────────────────────────────

  private async insertPosts(users: User[]): Promise<Post[]> {
    const promises: Promise<Post>[] = initialData.posts.map((post) =>
      this.postService.create(post, this.getRandomUser(users)),
    );
    const saved = await Promise.all(promises);
    this.logger.log(`${saved.length} posts insertados`);
    return saved;
  }

  // ── Comentarios con subcomentarios de 2 niveles ───────────────────────────

  private async insertComments(users: User[], posts: Post[]): Promise<void> {
    for (const seedComment of initialData.comments) {
      const post = posts[seedComment.postIndex];
      const author = users[seedComment.authorIndex];

      // Nivel 0: comentario raíz (sin padre)
      const rootComment = await this.commentService.create(
        post.id,
        { content: seedComment.content },
        author,
      );

      // Nivel 1: replies directas al comentario raíz
      if (seedComment.replies) {
        for (const seedReply of seedComment.replies) {
          const replyAuthor = users[seedReply.authorIndex];

          const reply = await this.commentService.create(
            post.id,
            { content: seedReply.content, parentId: rootComment.id },
            replyAuthor,
          );

          // Nivel 2: replies de una reply
          if (seedReply.replies) {
            for (const seedSubReply of seedReply.replies) {
              const subReplyAuthor = users[seedSubReply.authorIndex];

              await this.commentService.create(
                post.id,
                { content: seedSubReply.content, parentId: reply.id },
                subReplyAuthor,
              );
            }
          }
        }
      }
    }

    this.logger.log('Comentarios y subcomentarios insertados');
  }

  // ── Helper ─────────────────────────────────────────────────────────────────

  private getRandomUser(users: User[]): User {
    return users[Math.floor(Math.random() * users.length)];
  }
}
