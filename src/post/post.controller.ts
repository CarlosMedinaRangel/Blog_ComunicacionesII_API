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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/auth/Decorators/get-user.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Auth() //El usuario debe de estar autenticado
  //GetUser va a tomar el JWT para saber que usuario es
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll(@Query() PaginationDto: PaginationDto) {
    return this.postService.findAll(PaginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.postService.findOne(term);
  }

  @Get('/genero/:category')
  findByCategory(@Param('category') category: string) {
    return this.postService.findBycategory(category);
  }

  @Patch(':term')
  @Auth()
  update(
    @Param('term', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ) {
    return this.postService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
