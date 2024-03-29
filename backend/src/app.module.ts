import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigPG } from './config/typeORM.config';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { RedisCacheModule } from './cache/redisCache.module';
import { MailModule } from './mailer/mailer.module';
import { PersonModule } from './person/person.module';
import { MoviePersonModule } from './movie-person/movie-person.module';
import { WalletModule } from './wallet/wallet.module';
import { UserFavMoviesModule } from './user-fav-movies/user-fav-movies.module';
import { PlanModule } from './plan/plan.module';
import MailConfig from './config/mailer.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    TypeOrmModule.forRoot(ConfigPG),
    CacheModule.register({
      isGlobal: true,
    }),
    MailerModule.forRoot(MailConfig),
    UserModule,
    AuthModule,
    MovieModule,
    CommentModule,
    FileModule,
    RedisCacheModule,
    MailModule,
    PersonModule,
    MoviePersonModule,
    WalletModule,
    UserFavMoviesModule,
    PlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
