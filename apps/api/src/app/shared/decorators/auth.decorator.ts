import { applyDecorators } from './apply-decorators';
import { CanActivate, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(...additionalGuards: (CanActivate | Function)[]) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
    UseGuards(AuthGuard('jwt'), ...additionalGuards)
  );
}
