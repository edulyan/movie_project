import { Genre } from 'src/app/enums/enums';

export interface IUpdateMovie {
  title?: string;
  description?: string;
  year?: number;
  averageRating?: number;
  voteCount?: number;
  genre?: Genre[];
}
