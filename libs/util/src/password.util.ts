import { createHash, randomBytes } from 'crypto';

export class PasswordUtil {
  static hashPassword(inputPassword: string) {
    const salt = randomBytes(32).toString('hex');
    return createHash('sha512')
      .update(inputPassword + salt)
      .digest('hex');
  }
}
