import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { AccessTokenGuard } from './AccessTokenGuard';

export enum UserRoles {
  Admin = 'Admin',
  User = 'User',
}

export type roles = UserRoles.Admin | UserRoles.User;

export const RoleGuard = (roles: roles[]): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends AccessTokenGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      console.log(user);
      return roles.includes(user.role);
    }
  }
  return mixin(RoleGuardMixin);
};
