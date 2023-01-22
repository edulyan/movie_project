import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanType } from '../common/enums';
import { CreatePlanDto } from './dto/createPlan.dto';
import { Plan } from './entity/plan.entity';
import * as moment from 'moment';

@Injectable()
export class PlanService {
  private readonly logger = new Logger(PlanService.name);

  constructor(
    @InjectRepository(Plan) private planRepository: Repository<Plan>,
  ) {}

  async getPlans(): Promise<Plan[]> {
    return await this.planRepository.find();
  }

  async getPlanById(id: string): Promise<Plan> {
    const plan = await this.planRepository.findOne(id);

    if (!plan) {
      throw new HttpException('PLAN not found', HttpStatus.NOT_FOUND);
    }

    return plan;
  }

  async createPlan(createDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createDto);

    return await this.planRepository.save(plan);
  }

  getNextDate(planType: PlanType): string {
    if (planType === PlanType.MINUTE) {
      return moment(Date.now())
        .locale('ru')
        .add(15, 'second')
        .format('DD-MM-YYYY:HH-mm-ss');
    } else if (planType === PlanType.MONTH) {
      return moment(Date.now())
        .locale('ru')
        .add(30, 'days')
        .format('DD-MM-YYYY:HH-mm-ss');
    } else if (planType === PlanType.HALF_YEAR) {
      return moment()
        .locale('ru')
        .add(180, 'days')
        .format('DD-MM-YYYY:HH-mm-ss');
    } else if (planType === PlanType.YEAR) {
      return moment()
        .locale('ru')
        .add(360, 'days')
        .format('DD-MM-YYYY:HH-mm-ss');
    }
  }
}
