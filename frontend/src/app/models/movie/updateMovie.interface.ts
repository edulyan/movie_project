import { Country, Genre } from 'src/app/enums/enums';

export interface IUpdateMovie {
  title?: string;
  description?: string;
  director?: string;
  year?: number;
  ageRating?: string;
  runTime?: string;
  budget?: number;
  averageRating?: number;
  voteCount?: number;
  country?: Country[];
  genre?: Genre[];
}
