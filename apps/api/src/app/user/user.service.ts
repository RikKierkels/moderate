import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ManagementClient, User } from 'auth0';
import { ConfigService } from '@nestjs/config';
import { AuthConfiguration } from '../../config/configuration';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {}

  findOrCreate$(userId: string): Observable<UserEntity> {
    return from(this.userRepository.findOne(userId)).pipe(
      switchMap(user => (user ? of(user) : this.create$(userId)))
    );
  }

  private create$(userId: string): Observable<UserEntity> {
    return this.getUserProfile$(userId).pipe(
      map(profile => {
        return this.userRepository.create({
          id: profile.user_id,
          username: profile.nickname,
          picture: profile.picture
        });
      }),
      switchMap(userEntity => {
        return this.userRepository.save(userEntity);
      })
    );
  }

  private getUserProfile$(userId: string): Observable<User> {
    const config = this.configService.get<AuthConfiguration>('auth');

    const client = new ManagementClient({
      domain: config.domain,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      scope: 'read:users'
    });

    return from(client.getUser({ id: userId })).pipe(
      catchError(() => {
        throw new BadRequestException(
          `Something went wrong while fetching the user profile for user id: ${userId}.`
        );
      })
    );
  }
}
