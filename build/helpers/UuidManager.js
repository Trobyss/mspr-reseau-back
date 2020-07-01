'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const fs_1 = tslib_1.__importDefault(require('fs'));
const path_1 = tslib_1.__importDefault(require('path'));
const v4_1 = tslib_1.__importDefault(require('uuid/v4'));
const uuidHolder_json_1 = tslib_1.__importDefault(require('../seeders/uuidHolder'));
class UuidManager {
    constructor() {
        this.uuidHolder = uuidHolder_json_1.default;
    }
    getUuid(type, id, create = true) {
        if (!this.uuidHolder[type]) {
            this.uuidHolder[type] = {};
        }
        if (!this.uuidHolder[type][id]) {
            if (!create) {
                return null;
            }
            this.uuidHolder[type][id] = v4_1.default();
        }
        return this.uuidHolder[type][id];
    }
    persist() {
        const stringifiedUuidHolder = JSON.stringify(this.uuidHolder, null, 2);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', 'seeders', 'uuidHolder.json'), stringifiedUuidHolder);
    }
}
exports.UuidManager = UuidManager;    //# sourceMappingURL=UuidManager.js.map
