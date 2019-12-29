import { BadRequestException, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data, req) => {
  if (!req.user || !req.user.sub) {
    return new BadRequestException('UserId is missing from request.');
  }

  return req.user.sub;
});
