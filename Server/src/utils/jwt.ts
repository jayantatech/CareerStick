import jwt from "jsonwebtoken";

const jwtAccessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_SECRET as string;

const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, jwtAccessTokenSecret!, {
    expiresIn: "4h",
  });
};

const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, jwtRefreshTokenSecret!, {
    expiresIn: "30d",
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, jwtAccessTokenSecret!);
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, jwtRefreshTokenSecret!);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
