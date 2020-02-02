import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfiguration } from '../../config/configuration';
import { ManagementClient } from 'auth0';
import { MANAGEMENT_CLIENT_TOKEN } from '../shared/constants';
import { FactoryProvider } from '@nestjs/common/interfaces';

const managementClientFactory: FactoryProvider = {
  provide: MANAGEMENT_CLIENT_TOKEN,
  useFactory: (configService: ConfigService) => {
    // prettier-ignore
    const { domain, clientId, clientSecret } = configService.get<AuthConfiguration>('auth');

    return new ManagementClient({
      domain,
      clientId,
      clientSecret,
      scope: 'read:users'
    });
  },
  inject: [ConfigService]
};

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, managementClientFactory],
  exports: [PassportModule, MANAGEMENT_CLIENT_TOKEN]
})
export class AuthModule {}
