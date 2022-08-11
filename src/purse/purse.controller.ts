import { Body, Controller, Post } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { PurseDto } from './dto/createPurse.dto';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { PurseService } from './purse.service';

@Controller('purse')
export class PurseController {
  constructor(private readonly purseService: PurseService) {}

  @Post()
  async createPurse(@Body() createPurse: PurseDto) {
    return await this.purseService.createPurse(createPurse);
  }

  @Post('/makeTransfer')
  async makeTransfer(@Body() transferDto: CreateTransferDto) {
    return getConnection().transaction(async (transactionalEntityManager) => {
      const transfer = await this.purseService.makeTransfer(transferDto);
      await transactionalEntityManager.save(transfer);
    });
  }
}
