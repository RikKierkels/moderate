import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    CacheModule.register(),
    DatabaseModule,
    IdeaModule,
    AuthModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule {}
