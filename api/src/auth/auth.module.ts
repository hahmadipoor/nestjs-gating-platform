import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ChainModule } from 'src/chain/chain.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    UsersModule,
    ChainModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
