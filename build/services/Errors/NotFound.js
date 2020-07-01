"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class NotFoundError extends Base_1.BaseError {
    constructor(msg, why) {
        super(msg, 404);
        this.why = why;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFound.js.map