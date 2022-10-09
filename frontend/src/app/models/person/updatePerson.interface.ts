import { Country } from 'src/app/enums/enums';

export interface IUpdatePerson {
  name?: string;
  birthday?: Date;
  country?: Country;
}
