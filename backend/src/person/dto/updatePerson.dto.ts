import { Country } from '../../common/enums';

export class UpdatePersonDto {
  readonly name?: string;
  readonly birthday?: Date;
  readonly country?: Country;
}
