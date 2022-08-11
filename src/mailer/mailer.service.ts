import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from '../auth/dto/auth.dto';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async signUpMail(user: UserDto): Promise<void> {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Registration',
        text: `Congratulations, you have successfully registered on our website!
        
        Your account details:
        
        login: ${user.email}
        password: ${user.password}`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async forgotPassMail(auth: AuthDto): Promise<void> {
    await this.mailerService
      .sendMail({
        to: auth.email,
        subject: 'Changing the password',
        text: `Your password has been changed!
        
        New password:
        
        password: ${auth.password}`,
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
