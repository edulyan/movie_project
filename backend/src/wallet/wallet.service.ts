import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entity/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async createWallet(): Promise<Wallet> {
    const wallet = await this.walletRepository.create();

    return await this.walletRepository.save(wallet);
  }

  async saveWallet(wallet: Wallet): Promise<Wallet> {
    return await this.walletRepository.save(wallet);
  }
}
