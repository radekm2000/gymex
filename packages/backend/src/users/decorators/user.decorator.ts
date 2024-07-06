import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IssuedTokenPayload } from 'src/auth/tokens';

export const CurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { sub }: IssuedTokenPayload = request.user;

    return sub;
  },
);
