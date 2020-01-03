import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/database-entities';
import { Repository } from 'typeorm';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  findOrCreate$(userId: string): Observable<UserEntity> {
    return from(this.userRepository.findOne(userId)).pipe(
      switchMap(user =>
        user ? of(user) : from(this.userRepository.save({ id: userId }))
      )
    );
  }
}
