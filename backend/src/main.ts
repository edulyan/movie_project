import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // app.useGlobalInterceptors(new ChangeInterceptor());

  const PORT = process.env.PORT;

  await app.listen(PORT, () => console.log(`App is listening on ${PORT}...`));
}
bootstrap();
