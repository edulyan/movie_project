import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Purse } from './entity/purse.entity';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { PurseDto } from './dto/createPurse.dto';

@Injectable()
export class PurseService {
  constructor(
    @InjectRepository(Purse) private purseRepository: Repository<Purse>,
    private userService: UserService,
  ) {}

  async getPurseByID(id: number) {
    const purse = await this.purseRepository.findOne(id);

    if (!purse) {
      throw new HttpException('Purse not found', HttpStatus.NOT_FOUND);
    }

    return purse;
  }

  async createPurse(purseDto: PurseDto): Promise<Purse> {
    const purse = await this.purseRepository.create(purseDto);
    return await this.purseRepository.save(purse);
  }

  async savePurse(purse: Purse) {
    await this.purseRepository.save(purse);
  }

  async makeTransfer(transferDto: CreateTransferDto) {
    if (transferDto.fromId === transferDto.toId) {
      throw new HttpException(
        'Users must have different Ids',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fromUser = await this.userService.getById(transferDto.fromId);
    const toUser = await this.userService.getById(transferDto.toId);

    if (!fromUser.defaultPurseId) {
      throw new HttpException(
        `User (${transferDto.fromId}) do not have a default purse`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!toUser.defaultPurseId) {
      throw new HttpException(
        `User (${transferDto.toId}) do not have a default purse`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const fromPurse = await this.getPurseByID(fromUser.defaultPurseId);
    const toPurse = await this.getPurseByID(toUser.defaultPurseId);
    const modalSum = Math.abs(transferDto.sum);

    if (fromPurse.balance < modalSum) {
      throw new HttpException(
        `User ("${transferDto.fromId}") not enough money: "${fromPurse.balance} < ${modalSum}"`,
        HttpStatus.BAD_REQUEST,
      );
    }
    fromPurse.balance -= transferDto.sum;
    toPurse.balance += transferDto.sum;

    await this.savePurse(fromPurse);
    if (transferDto.withError) {
      throw new HttpException(
        'UNEXPECTED ERROR WAS THROWN WHILE TRANSFER WAS IN PROGRESS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await this.savePurse(toPurse);
    return {
      sum: transferDto.sum,
      fromId: transferDto.fromId,
      toId: transferDto.toId,
      fromBalance: fromPurse.balance,
      toBalance: toPurse.balance,
    };
  }
}
