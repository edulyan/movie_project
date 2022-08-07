import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    TypeOrmModule.forRoot(ConfigPG),
    UserModule,
    AuthModule,
    MovieModule,
    CommentModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
