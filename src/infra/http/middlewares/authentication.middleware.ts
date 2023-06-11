import { Request, Response } from 'express';
import { JsonWebTokenConfig } from '../../../@config/json-web-token.config';

export async function AuthenticationMiddleware(req: Request, res: Response, next) {
  const accessToken = req['authorization'];
  const [bearer, token] = accessToken.split(' ');
  if (bearer !== 'bearer') {
    return res.status(401).json({
      message: 'invalid scheme',
    });
  }

  const jwt = new JsonWebTokenConfig();
  const isValid = await jwt.verify(token);
  if (!isValid) {
    return res.status(401).json({
      message: 'not authorized',
    });
  }

  return next();
}
