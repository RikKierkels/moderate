import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    IdeaModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
