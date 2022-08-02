import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { Movie } from '../movie/entity/movie.entity';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([Comment, Movie, User]),
    UserModule,
    MovieModule,
    AuthModule,
  ],
  exports: [CommentService],
})
export class CommentModule {}
