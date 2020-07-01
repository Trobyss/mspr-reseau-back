"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=Base.js.map