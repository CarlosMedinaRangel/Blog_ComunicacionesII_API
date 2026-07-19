import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/auth/entities/auth.entity';
import { IsNull, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger('CommentsService');

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>, // camelCase

    private readonly postService: PostService,

    private readonly commonService: CommonService, // camelCase
  ) {}

  async create(postId: string, createCommentDto: CreateCommentDto, user: User) {
    const { parentId, content, isActive = true } = createCommentDto;

    const post = await this.postService.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post con ID "${postId}" no encontrado`);
    }

    let parent: Comment | null = null;
    if (parentId) {
      parent = await this.commentRepository.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          `Comentario padre con ID "${parentId}" no encontrado`,
        );
      }
    }

    try {
      const comment = this.commentRepository.create({
        content,
        isActive,
        post,
        user,
        parent,
      });

      return await this.commentRepository.save(comment);
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 100, offset = 0 } = paginationDto;

    const comments = await this.commentRepository.find({
      take: limit,
      skip: offset,
      relations: { user: true, post: true },
      where: { parent: IsNull() },
    });

    return { comments };
  }

  async findOne(id: string): Promise<Comment> {
    if (!isUUID(id)) {
      throw new NotFoundException(`"${id}" no es un UUID válido`);
    }

    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true, replies: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comentario con ID "${id}" no encontrado`);
    }

    return comment;
  }

  async findByPost(postId: string, paginationDto: PaginationDto) {
    // Verificar que el post existe primero
    const post = await this.postService.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post con ID "${postId}" no encontrado`);
    }

    const comments = await this.commentRepository.find({
      where: {
        post: { id: postId },
        parent: IsNull(), // solo comentarios raíz, sin replies anidadas
        isActive: true,
      },
      relations: {
        user: true,
        replies: true, // primer nivel de replies
      },
      order: {
        createdAt: 'DESC',
      },
      take: paginationDto.limit ?? 20,
      skip: paginationDto.offset ?? 0,
    });

    return {
      postId,
      total: comments.length,
      comments,
    };
  }

  async findReplies(commentId: string) {
    const comment = await this.findOne(commentId);

    // Usar TreeRepository para obtener todos los descendientes
    const tree = await this.commentRepository.manager
      .getTreeRepository(Comment)
      .findDescendantsTree(comment, {
        depth: 3, // máximo 3 niveles de profundidad
        relations: ['user'],
      });

    return tree;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, user: User) {
    const comment = await this.findOne(id);

    if (comment.userId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para editar este comentario',
      );
    }

    if (updateCommentDto.content !== undefined) {
      comment.content = updateCommentDto.content;
    }
    if (updateCommentDto.isActive !== undefined) {
      comment.isActive = updateCommentDto.isActive;
    }

    try {
      return await this.commentRepository.save(comment);
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }

  async remove(id: string, user: User) {
    const comment = await this.findOne(id);

    if (comment.userId !== user.id) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este comentario',
      );
    }

    try {
      await this.commentRepository.remove(comment);
      return { message: `Comentario "${id}" eliminado correctamente` };
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }

  async DeleteALlcomments() {
    const query = this.commentRepository.createQueryBuilder('comment');

    try {
      return await query.delete().where({}).execute();
    } catch (error: any) {
      this.commonService.handleExceptions(error, this.logger);
    }
  }
}
