import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { NotFoundError } from 'rxjs';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Post)
    private readonly productPost: Repository<Post>,

    private readonly CommonService: CommonService,
  ) {}

  //
  async create(createPostDto: CreatePostDto, user: User) {
    try {
      const post = this.productPost.create({
        Create_At: new Date(),
        ...createPostDto,
        user,
      });

      const result = await this.productPost.save(post);
      return result;
    } catch (error: any) {
      this.CommonService.handleExceptions(error, this.logger);
    }
  }

  async findAll(PaginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = PaginationDto;

    const post = await this.productPost.find({
      take: limit,
      skip: offset,
    });
    return {
      posts: post,
    };
  }

  async findOne(term: string) {
    let post: Post | null = null;

    if (isUUID(term)) {
      post = await this.productPost.findOneBy({ id: term });
    }
    if (!post) {
      const queryBuilder = this.productPost.createQueryBuilder('post');

      post = await queryBuilder
        .where(`UPPER(title) =:title`, {
          title: term.toUpperCase(),
        })
        .getOne();
    }
    if (!post)
      throw new NotFoundException(
        `El post que buscas con el ${term} no fue encontrado`,
      );
    return post;
  }

  async findBycategory(term: string) {
    let post: Post[] | null = null;

    const queryBuilder = this.productPost.createQueryBuilder('post');

    post = await queryBuilder

      .where('UPPER(post."Category") = :category', {
        category: term.toUpperCase(),
      })
      .leftJoinAndSelect('post.user', 'user')
      .getMany();

    if (!post)
      throw new NotFoundException(
        `El post que buscas con el ${term} no fue encontrado`,
      );
    return {
      posts: post,
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto, user) {
    const post = await this.productPost.preload({
      id,
      ...updatePostDto,
    });

    if (!post)
      throw new NotFoundException(
        `El post que buscas con el ${id} no fue encontrado`,
      );
    post.user = user;
    try {
      const result = await this.productPost.save(post);
      return result;
    } catch (error: any) {
      this.CommonService.handleExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const post = await this.findOne(id);

    try {
      const result = await this.productPost.remove(post);
      return result;
    } catch (error: any) {
      this.CommonService.handleExceptions(error, this.logger);
    }
  }
}
