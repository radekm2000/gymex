import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IssuedTokenPayload } from 'src/auth/tokens';

export const CurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { sub, iat, exp }: IssuedTokenPayload = request.user;

    return sub;
  },
);
