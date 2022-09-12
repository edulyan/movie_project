import { Country } from '../../common/enums';

export class UpdateActorDto {
  readonly name?: string;
  readonly birthday?: Date;
  readonly country?: Country;
}
