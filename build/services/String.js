"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = require("./Base");
const fast_levenshtein_1 = tslib_1.__importDefault(require("fast-levenshtein"));
const slugify_1 = tslib_1.__importDefault(require("slugify"));
class StringService extends Base_1.BaseService {
    levenshtein(a, b) {
        return fast_levenshtein_1.default.get(a, b);
    }
    slugify(input) {
        return slugify_1.default(input, {
            lower: true,
            strict: true
        });
    }
}
exports.StringService = StringService;
//# sourceMappingURL=String.js.map