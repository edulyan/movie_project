import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlanType } from '../common/enums';
import { CreatePlanDto } from './dto/createPlan.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  // @Cron(CronExpression.EVERY_30_SECONDS, {
  //   timeZone: 'Europe/Moscow',
  // })
  @Get()
  async getPlans() {
    console.log('GET-PLANS');

    return await this.planService.getPlans();
  }

  @Post()
  async createPlan(@Body() dto: CreatePlanDto) {
    return await this.planService.createPlan(dto);
  }

  @Post('/getNextDate')
  async getNextDate(@Body() planType: PlanType) {
    return this.planService.getNextDate(planType);
  }
}
