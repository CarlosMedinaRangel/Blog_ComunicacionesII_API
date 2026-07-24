// src/post/post.controller.ts

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
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'; // ← FilesInterceptor (plural)
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/auth/Decorators/get-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { fileFilter } from 'src/files/helpers/fileFilter';
import { fileNamer } from 'src/files/helpers/fileNamer';

@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {}

  // POST /api/post
  // Acepta multipart/form-data: campos de texto + archivos de imagen opcionales
  @Post()
  @Auth()
  @ApiOperation({ summary: 'Crear post (con imágenes opcionales)' })
  // @ApiConsumes le dice a Swagger que este endpoint acepta multipart
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        Content: { type: 'string' },
        Category: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        // "files" es el nombre del campo en el form
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  // FilesInterceptor('files', 5) → acepta hasta 5 archivos en el campo "files"
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter,
      storage: diskStorage({
        destination: './static/posts',
        filename: fileNamer,
      }),
    }),
  )
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    // Construimos las URLs a partir de los archivos subidos
    const hostApi = this.configService.get<string>('HOST_FILES');

    const images = (files ?? []).map(
      (file) => `${hostApi}/static/posts/${file.filename}`,
    );

    // Inyectamos las URLs en el DTO antes de pasarlo al servicio
    return this.postService.create({ ...createPostDto, images }, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.postService.findOnePlain(term);
  }

  @Get('/genero/:category')
  findByCategory(@Param('category') category: string) {
    return this.postService.findBycategory(category);
  }

  // PATCH /api/post/:id
  // También acepta imágenes opcionales para reemplazar las anteriores
  @Patch(':term')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        Content: { type: 'string' },
        Category: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      fileFilter,
      storage: diskStorage({
        destination: './static/posts',
        filename: fileNamer,
      }),
    }),
  )
  update(
    @Param('term', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const hostApi = this.configService.get<string>('HOST_FILES');

    // Si subió nuevas imágenes, las agregamos al DTO
    // Si no subió ninguna, el servicio mantiene las imágenes actuales
    if (files?.length) {
      const images = files.map(
        (file) => `${hostApi}/static/posts/${file.filename}`,
      );
      updatePostDto = { ...updatePostDto, images };
    }

    return this.postService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
