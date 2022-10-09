import { Country, Genre } from 'src/app/enums/enums';
import { IComment } from '../comment/comment.interface';
import { IMoviePerson } from '../movie-person/moviePerson.interface';

export interface IMovie {
  id: string;
  title: string;
  description: string;
  director: string;
  year: number;
  ageRating: string;
  runTime: string;
  budget: number;
  country: Country[];
  genre: Genre[];
  averageRating: number;
  voteCount: number;
  image: string;
  video: string;
  trailer: string;
  comments: IComment[];
  personToMovies: IMoviePerson[];
  createdDate: Date;
  updatedDate: Date;
}
