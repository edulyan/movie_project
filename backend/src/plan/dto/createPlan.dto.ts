import { PlanType } from '../../common/enums';

export class CreatePlanDto {
  readonly type: PlanType;
  readonly price: number;
}
