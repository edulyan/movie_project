import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SomeInterceptor } from './interceptors/some.interceptor';
import { ChangeInterceptor } from './interceptors/change.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.useGlobalInterceptors(new ChangeInterceptor());

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => console.log(`App is listening on ${PORT}...`));
}
bootstrap();
