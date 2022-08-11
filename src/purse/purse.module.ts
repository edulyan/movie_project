import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Purse } from './entity/purse.entity';
import { PurseController } from './purse.controller';
import { PurseService } from './purse.service';

@Module({
  controllers: [PurseController],
  providers: [PurseService],
  imports: [TypeOrmModule.forFeature([Purse]), UserModule],
})
export class PurseModule {}
