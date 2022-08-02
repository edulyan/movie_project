import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly movieService: MovieService,
  ) {}

  async getAll(): Promise<Comment[]> {
    try {
      return await this.commentRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to get comments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: id },
      });
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
      }

      return comment;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to get comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createComment(comment: CommentDto) {
    try {
      console.log(comment);

      const userOne = await this.userService.getById(comment.userId);
      const movieOne = await this.movieService.getById(comment.movieId);
      const newComment = await this.commentRepository.create({
        ...comment,
        username: userOne.firstName + ' ' + userOne.lastName,
        movie: movieOne,
        user: userOne,
      });

      return await this.commentRepository.save(newComment);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteComment(id: string): Promise<void> {
    try {
      await this.commentRepository.delete(id).catch((err: string) => {
        if (!id) {
          throw new HttpException('Failed to found user', HttpStatus.NOT_FOUND);
        }
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
