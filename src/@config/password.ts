import { APP_CONFIG } from './environment.config';
import bcrypt from 'bcrypt';

export class Password {
  private readonly salt = APP_CONFIG.SALT_PASS || 6;

  async generate(pass: string) {
    const salt = bcrypt.genSaltSync(Number(this.salt));
    return bcrypt.hash(pass, salt);
  }
  async compare(pass: string, hash: string) {
    return bcrypt.compare(pass, hash);
  }
}
