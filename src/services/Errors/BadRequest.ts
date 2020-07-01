import { BaseError } from "./Base";

export class BadRequestError extends BaseError {
  why: string;
  fields: any;
  /**
   *
   * @param {string} msg
   * @param {string} why
   * @param {Array<string>} fields
   */
  constructor(msg: string, why: string, fields?: any) {
    super(msg, 400);
    this.why = why; // ex 'MISSING_FIELDS' (from constant)
    this.fields = fields; // ex [ 'site', 'firstName' ]
  }
}
