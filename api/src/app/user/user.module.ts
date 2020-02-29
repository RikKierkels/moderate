import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../database/entities/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
