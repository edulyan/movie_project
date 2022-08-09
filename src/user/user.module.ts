import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { MovieModule } from '../movie/movie.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '../cache/redisCache.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    TypeOrmModule.forFeature([User]),
    MovieModule,
    AuthModule,
    RedisCacheModule,
  ],
  exports: [UserService],
})
export class UserModule {}
