// src/seed/seed.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { User } from 'src/auth/entities/auth.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommentsService } from 'src/comments/comments.service';
import { PostLikesService } from 'src/post-likes/post-likes.service';
import { PostService, PostResponse } from 'src/post/post.service';
import { initialData } from './data/Seed-Data';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentsService,
    private readonly postLikeService: PostLikesService,
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly productPost: Repository<Post>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const users = await this.insertUsers();
    const posts = await this.insertPosts(users);
    await this.insertComments(users, posts);

    return {
      message: `Seed ejecutado: ${users.length} usuarios, ${posts.length} posts`,
    };
  }

  // ── Limpiar tablas ────────────────────────────────────────────────────────

  private async deleteTables() {
    await this.postLikeService.DeleteALlPostLikes();
    await this.commentService.DeleteALlcomments(); // ya borra closure internamente
    await this.postService.DeleteALlPost(); // ya borra post_images internamente
    await this.userRepository.query('DELETE FROM "users"');
    this.logger.log('Tablas limpiadas');
  }

  // ── Usuarios ──────────────────────────────────────────────────────────────

  private async insertUsers(): Promise<User[]> {
    const userEntities = initialData.users.map((u) =>
      this.userRepository.create(u),
    );
    const saved = await this.userRepository.save(userEntities);
    this.logger.log(`${saved.length} usuarios insertados`);
    return saved;
  }

  // ── Posts ─────────────────────────────────────────────────────────────────

  private async insertPosts(users: User[]): Promise<PostResponse[]> {
    const hostApi = this.configService.get<string>('HOST_API');

    const promises: Promise<PostResponse>[] = initialData.posts.map((post) => {
      // Construimos las URLs completas a partir del nombre del archivo
      // Si ya son URLs completas (http://...) las dejamos igual
      // Si son nombres de archivo, les añadimos el host
      const images = post.image.map((img) =>
        img.startsWith('http') ? img : `${hostApi}/files/post/${img}`,
      );

      return this.postService.create(
        { ...post, images },
        this.getRandomUser(users),
      );
    });

    const saved = await Promise.all(promises);
    this.logger.log(`${saved.length} posts insertados`);
    return saved;
  }

  // ── Comentarios con 2 niveles ─────────────────────────────────────────────

  private async insertComments(
    users: User[],
    posts: PostResponse[],
  ): Promise<void> {
    for (const seedComment of initialData.comments) {
      const post = posts[seedComment.postIndex];
      const author = users[seedComment.authorIndex];

      // Nivel 0: comentario raíz
      const rootComment = await this.commentService.create(
        post.id,
        { content: seedComment.content },
        author,
      );

      // Nivel 1: replies al comentario raíz
      if (seedComment.replies) {
        for (const seedReply of seedComment.replies) {
          const reply = await this.commentService.create(
            post.id,
            { content: seedReply.content, parentId: rootComment.id },
            users[seedReply.authorIndex],
          );

          // Nivel 2: replies de una reply
          if (seedReply.replies) {
            for (const seedSubReply of seedReply.replies) {
              await this.commentService.create(
                post.id,
                { content: seedSubReply.content, parentId: reply.id },
                users[seedSubReply.authorIndex],
              );
            }
          }
        }
      }
    }

    this.logger.log('Comentarios insertados');
  }

  // ── Helper ────────────────────────────────────────────────────────────────

  private getRandomUser(users: User[]): User {
    return users[Math.floor(Math.random() * users.length)];
  }
}
