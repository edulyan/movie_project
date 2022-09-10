import { Country, Genre } from 'src/app/enums/enums';

export interface ICreateMovie {
  title: string;
  description: string;
  director: string;
  year: number;
  ageRating: string;
  runTime: string;
  budget: number;
  country: Country[];
  genre: Genre[];
}
