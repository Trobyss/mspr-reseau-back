import { BaseService } from "./Base";
import levenshtein from "fast-levenshtein";
import slugify from "slugify";

export class StringService extends BaseService {
  /**
   * dummy wrapper for levenshtein distance
   *
   * @param {string} a
   * @param {string} b
   * @returns {string}
   */
  levenshtein(a: string, b: string) {
    return levenshtein.get(a, b);
  }

  /**
   * standardizes the given input string
   *
   * @param {string} input
   * @returns {string}
   */
  slugify(input: string) {
    return slugify(input, {
      lower: true,
      strict: true
    });
  }
}
