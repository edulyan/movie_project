import { MailerModule } from '@nestjs-modules/mailer';

export const MailConfig: MailerModule = {
  transport: {
    host: process.env.MAILER_HOST,
    port: parseInt(process.env.MAILER_PORT),
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  },
  defaults: {
    from: `Movie-Website <${process.env.MAILER_USER}>`,
  },
};

export default MailConfig;
