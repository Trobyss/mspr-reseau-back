import { BaseError } from "./Base";

export class NotFoundError extends BaseError {
  why: string;
  /**
   *
   * @param {string} msg
   * @param {string} why
   */
  constructor(msg: string, why: any) {
    super(msg, 404);
    this.why = why;
  }
}
