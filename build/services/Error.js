"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = require("./Base");
const fs_1 = tslib_1.__importDefault(require("fs"));
class ErrorService extends Base_1.BaseService {
    constructor(app) {
        super(app);
        this.setupErrors();
    }
    setupErrors() {
        const files = fs_1.default
            .readdirSync(__dirname + "/Errors")
            .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of files) {
            const ErrorConstructor = require(__dirname + "/Errors/" + file)[`${file.replace(".ts", "").replace(".js", "")}Error`];
            this[ErrorConstructor.name.replace("Error", "")] = ErrorConstructor;
        }
    }
}
exports.ErrorService = ErrorService;
//# sourceMappingURL=Error.js.map