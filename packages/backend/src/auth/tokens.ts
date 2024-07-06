export type AccessTokenPayload = {
  sub: number;
};

export type RefreshTokenPayload = {
  sub: number;
};

export type IssuedTokenPayload = {
  sub: number;
  iat: number;
  exp: number;
};
