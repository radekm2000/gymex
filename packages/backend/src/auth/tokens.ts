import { UserRoles } from './utils/RoleGuard';

export type AccessTokenPayload = {
  sub: number;
  role: UserRoles.Admin | UserRoles.User;
};

export type RefreshTokenPayload = {
  sub: number;
  role: UserRoles.Admin | UserRoles.User;
};

export type IssuedTokenPayload = {
  sub: number;
  iat: number;
  exp: number;
  role: UserRoles.Admin | UserRoles.User;
};
