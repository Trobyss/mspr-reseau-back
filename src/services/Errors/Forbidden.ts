import { BaseError } from "./Base";

/**
 * @class ForbiddenError
 * @extends BaseError
 */
export class ForbiddenError extends BaseError {
  /**
   * @param {string} [message=ForbiddenError]
   */
  constructor(message = "ForbiddenError") {
    super(message, 403);
  }
}
