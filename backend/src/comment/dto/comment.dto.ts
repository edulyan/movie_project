import { IsString, MaxLength } from 'class-validator';

export class CommentDto {
  @IsString({
    message: 'Title must be a string',
  })
  @MaxLength(800, {
    message: 'Text is too long',
  })
  text: string;

  rating: number;

  @IsString({ message: 'UserId must be a string' })
  userId: string;

  @IsString({ message: 'MovieId must be a string' })
  movieId: string;
}
