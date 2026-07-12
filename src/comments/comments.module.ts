import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CommonModule,
    AuthModule,
    PostModule,
  ],

  exports: [TypeOrmModule, CommentsModule, CommentsService],
})
export class CommentsModule {}
