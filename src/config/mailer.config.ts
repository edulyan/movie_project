import { MailerModule } from '@nestjs-modules/mailer';

export const MailConfig: MailerModule = {
  transport: {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'mnatik94@mail.ru',
      pass: 'jYFrq6UkEyckjN67rcjM',
    },
  },
  defaults: {
    from: `Movie-Website <mnatik94@mail.ru>`,
  },
};

export default MailConfig;
