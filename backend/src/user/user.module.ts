import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from '../movie/movie.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '../cache/redisCache.module';
import { User } from './entity/user.entity';
import { EventEmit } from './event-emitter';
import { UserFavMovies } from '../user-fav-movies/entity/userFavMovies.entity';
import { Comment } from '../comment/entity/comment.entity';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet } from '../wallet/entity/wallet.entity';

@Module({
  providers: [UserService, EventEmit],
  controllers: [UserController],
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([User, Comment, UserFavMovies, Wallet]),
    MovieModule,
    AuthModule,
    WalletModule,
    RedisCacheModule,
  ],
  exports: [UserService],
})
export class UserModule {}
