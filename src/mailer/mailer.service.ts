import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MailConfig from '../config/mailer.config';
import { User } from '../user/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async signUpMail(user: User) {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Movie-Website',
        text: `Congratulations, you have successfully registered on our website!
        
        Your account details:
        login: ${user.email}
        password: ${user.password}`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
