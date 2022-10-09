import { Country } from 'src/app/enums/enums';

export interface ICreatePerson {
  name: string;
  birthday: Date;
  country: Country;
}
