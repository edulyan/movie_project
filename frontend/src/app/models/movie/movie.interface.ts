import { Genre } from 'src/app/enums/enums';
import { IComment } from '../comment/comment.interface';

export interface IMovie {
  id: string;
  title: string;
  description: string;
  year: number;
  genre: Genre[];
  averageRating: number;
  voteCount: number;
  image: string;
  video: string;
  comments: IComment[];
  createdDate: Date;
  updatedDate: Date;
}
