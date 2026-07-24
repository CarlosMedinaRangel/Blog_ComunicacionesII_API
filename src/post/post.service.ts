// src/post/post.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { User } from 'src/auth/entities/auth.entity';
import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostImage } from './entities/post-image.entity';

// Interface para devolver imágenes como URLs planas al frontend
export interface PostResponse extends Omit<Post, 'images'> {
  images: string[];
}

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly productPost: Repository<Post>,

    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,

    private readonly datasource: DataSource,

    private readonly commonService: CommonService,
  ) {}

  // ── create ────────────────────────────────────────────────────────────────

  async create(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostResponse> {
    try {
      // ✅ Desestructuramos images del DTO para manejarlas por separado
      const { images = [], ...productDetails } = createPostDto;

      const post = this.productPost.create({
        ...productDetails, // ✅ Sin images — evita conflicto de tipos
        Create_At: new Date() as any,
        images: images.map((url) => this.postImageRepository.create({ url })),
        user,
      });

      const result = await this.productPost.save(post);

      // Devolvemos las URLs como strings para el frontend
      return {
        ...result,
        images,
      };
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }

  // ── findAll ───────────────────────────────────────────────────────────────

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const posts = await this.productPost.find({
      take: limit,
      skip: offset,
      relations: { images: true },
    });

    return posts.map(({ images, ...rest }) => ({
      ...rest,
      images: images?.map((img) => img.url) ?? [],
    }));
  }

  // ── findOne ───────────────────────────────────────────────────────────────

  async findOne(term: string): Promise<Post> {
    let post: Post | null = null;

    if (isUUID(term)) {
      post = await this.productPost.findOne({
        where: { id: term },
        relations: {
          images: true,
        },
      });
    }

    if (!post) {
      post = await this.productPost
        .createQueryBuilder('post')
        .where('UPPER(post.title) = :title', { title: term.toUpperCase() })
        .leftJoinAndSelect('post.images', 'postImages')
        .getOne();
    }

    if (!post) {
      throw new NotFoundException(`El post con "${term}" no fue encontrado`);
    }

    return post;
  }

  // ── findOnePlain: devuelve imágenes como strings ──────────────────────────

  async findOnePlain(term: string): Promise<PostResponse> {
    const { images = [], ...rest } = await this.findOne(term);

    return {
      ...rest,
      images: images.map((img) => img.url),
    };
  }

  // ── findByCategory ────────────────────────────────────────────────────────

  async findBycategory(term: string) {
    const posts = await this.productPost
      .createQueryBuilder('post')
      .where('UPPER(post."Category") = :category', {
        category: term.toUpperCase(),
      })
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.images', 'images')
      .getMany();

    if (!posts.length) {
      throw new NotFoundException(`No hay posts con la categoría "${term}"`);
    }

    return {
      posts: posts.map(({ images, ...rest }) => ({
        ...rest,
        images: images?.map((img) => img.url) ?? [],
      })),
    };
  }

  // ── update ────────────────────────────────────────────────────────────────

  async update(id: string, updatePostDto: UpdatePostDto, user: User) {
    const { images, ...toUpdate } = updatePostDto;

    const post = await this.productPost.preload({ id, ...toUpdate });

    if (!post) {
      throw new NotFoundException(`El post con id "${id}" no fue encontrado`);
    }

    // El autor del post no cambia al editar — mantenemos el original
    // post.user = user  ← esto reemplazaría el autor, lo quitamos

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        // Borramos las imágenes anteriores y las reemplazamos
        await queryRunner.manager.delete(PostImage, { Post: { id } });

        post.images = images.map((url) =>
          this.postImageRepository.create({ url }),
        );
      }

      await queryRunner.manager.save(post);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.commonService.handleExceptions(error, this.logger);
    }
  }

  // ── remove ────────────────────────────────────────────────────────────────

  async remove(id: string) {
    const post = await this.findOne(id);

    try {
      return await this.productPost.remove(post);
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }

  // ── deleteAllPosts (para el seed) ─────────────────────────────────────────

  async DeleteALlPost() {
    try {
      await this.productPost.query('DELETE FROM "post_image"');
      await this.productPost.query('DELETE FROM "POST"');
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }
}
