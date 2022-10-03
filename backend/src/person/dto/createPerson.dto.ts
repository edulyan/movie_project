import { Country } from '../../common/enums';

export class CreatePersonDto {
  readonly name: string;
  readonly birthday: Date;
  readonly country: Country;
}
