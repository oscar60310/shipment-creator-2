import jwt from 'jsonwebtoken';

import User from './dbModels/user.model';

const secret = process.env.SECRET || 'NBo9bn43BN89nabqnbp03qbqrebnNBDq';

export interface TokenContent {
  id: string;
  role: string;
}

export const getToken = (user: User) => {
  return jwt.sign({ id: user.id, role: user.role }, secret, {
    expiresIn: '1d'
  });
};

export const validateToken = (token: string): TokenContent => {
  return jwt.verify(token, secret) as TokenContent;
};
