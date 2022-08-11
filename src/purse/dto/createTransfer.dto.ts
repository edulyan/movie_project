export class CreateTransferDto {
  readonly fromId: string;
  readonly toId: string;
  readonly sum: number;
  readonly withError: boolean;
}
