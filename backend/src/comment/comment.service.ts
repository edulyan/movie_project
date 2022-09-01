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
      throw new HttpException(
        'Failed to get comments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: id },
    });
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  async createComment(comment: CommentDto) {
    const userOne = await this.userService.getById(comment.userId);
    const movieOne = await this.movieService.getById(comment.movieId);
    const newComment = await this.commentRepository.create({
      ...comment,
      movie: movieOne,
      user: userOne,
    });

    const voutCount = movieOne.voteCount + 1;

    const result =
      Math.round(
        ((movieOne.averageRating * movieOne.voteCount + comment.rating) /
          voutCount) *
          10,
      ) / 10;

    await this.movieService.updateMovie(comment.movieId, {
      averageRating: result,
      voteCount: movieOne.voteCount + 1,
    });

    return await this.commentRepository.save(newComment);
  }

  async deleteComment(id: string): Promise<boolean> {
    const comment = await this.commentRepository.findOne(id);

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    await this.commentRepository.delete(id);

    return true;
  }
}
