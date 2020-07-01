'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const _config_1 = require('../config/index');
class BaseService {
    constructor(app) {
        this.context = app;
        this.config = _config_1.CONFIG;
    }
    init() {
    }
    asyncInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.BaseService = BaseService;    //# sourceMappingURL=Base.js.map
