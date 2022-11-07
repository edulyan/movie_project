import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { User } from '../user/entity/user.entity';

@Module({
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
  imports: [TypeOrmModule.forFeature([Wallet, User])],
})
export class WalletModule {}
