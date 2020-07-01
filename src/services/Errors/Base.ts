/**
 * @class BaseError
 * @extends Error
 * @property {string} message
 * @property {number} code
 */
export class BaseError extends Error {
  code: number;
  /**
   * @param {string} message
   * @param {number} code
   */
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
