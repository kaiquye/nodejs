import jwt from 'jsonwebtoken';
import { APP_CONFIG } from './environment.config';

export class JsonWebTokenConfig {
  private readonly symmetricKey = APP_CONFIG.SYMMETRIC_KEY;
  async sing(payload: object, claim: string[]) {
    const data = { infos: payload, claims: claim };
    jwt.sign(data, this.symmetricKey, { algorithm: 'RS256', expiresIn: 3000 });
  }

  async verify(access_token: string) {
    try {
      jwt.verify(access_token, this.symmetricKey);
    } catch (e) {
      return false;
    }
  }
}
