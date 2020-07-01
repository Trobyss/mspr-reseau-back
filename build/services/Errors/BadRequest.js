"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class BadRequestError extends Base_1.BaseError {
    constructor(msg, why, fields) {
        super(msg, 400);
        this.why = why;
        this.fields = fields;
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequest.js.map