import { Country } from '../../common/enums';

export class CreateActorDto {
  readonly name: string;
  readonly birthday: Date;
  readonly country: Country;
}
