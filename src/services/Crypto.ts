import bcrypt from "bcryptjs";
import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";

export class Crypto extends BaseService {
  constructor(app: ServiceContainer) {
    super(app);
  }

  generate(n: number): string {
    const add = 1;
    let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

    if (n > max) {
      return this.generate(max) + this.generate(n - max);
    }

    max = Math.pow(10, n + add);
    const min = max / 10; // Math.pow(10, n) basically
    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

  /**
   * Generate OTP token
   *
   * @param {String} password
   * @param {String} hash
   * @returns {Boolean}
   */
  async generateOTP() {
    let otp = this.generate(7);
    let isExist = true;

    while (isExist) {
      const user = await this.context.database.models.User.findOne({
        where: {
          otp,
        },
      });
      if (user) {
        otp = this.generate(7);
      } else {
        isExist = false;
      }
    }

    return otp;
  }

  /**
   * Checks a clear password against its stored hash
   *
   * @param {String} password
   * @param {String} hash
   * @returns {Boolean}
   */
  checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Computes a cryptographic hash of the given value
   * Returns an string containing the hash and the salt:
   *
   *   (binary)[ hash 48 bytes ][ salt 16 bytes ] = 64 bytes
   *
   * @param {string} clear - the value to hash
   * @returns {String}
   */
  async password(clear: string) {
    const salt = await bcrypt.genSalt(16);
    return await bcrypt.hash(clear, salt);
  }
}
