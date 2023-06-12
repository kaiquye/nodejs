import jwt from 'jsonwebtoken';
import { APP_CONFIG } from './environment.config';

export class JsonWebTokenConfig {
  private readonly symmetricKey = APP_CONFIG.SYMMETRIC_KEY;
  async sing(payload: object, claim: string[]) {
    const data = { infos: payload, claims: claim };
    return jwt.sign(data, this.symmetricKey, { algorithm: 'HS256', expiresIn: 3000 });
  }

  async verify(access_token: string) {
    try {
      const rs = await jwt.verify(access_token, this.symmetricKey);
      return rs;
    } catch (e) {
      return false;
    }
  }
}
