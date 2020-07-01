"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class ForbiddenError extends Base_1.BaseError {
    constructor(message = "ForbiddenError") {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=Forbidden.js.map