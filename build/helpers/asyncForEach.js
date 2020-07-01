"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function asyncForEach(array, callback) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
exports.asyncForEach = asyncForEach;
//# sourceMappingURL=asyncForEach.js.map