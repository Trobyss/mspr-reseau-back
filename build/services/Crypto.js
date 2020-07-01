"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const Base_1 = require("./Base");
class Crypto extends Base_1.BaseService {
    constructor(app) {
        super(app);
    }
    generate(n) {
        const add = 1;
        let max = 12 - add;
        if (n > max) {
            return this.generate(max) + this.generate(n - max);
        }
        max = Math.pow(10, n + add);
        const min = max / 10;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        return ("" + number).substring(add);
    }
    generateOTP() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let otp = this.generate(7);
            let isExist = true;
            while (isExist) {
                const user = yield this.context.database.models.User.findOne({
                    where: {
                        otp,
                    },
                });
                if (user) {
                    otp = this.generate(7);
                }
                else {
                    isExist = false;
                }
            }
            return otp;
        });
    }
    checkPassword(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
    password(clear) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(16);
            return yield bcryptjs_1.default.hash(clear, salt);
        });
    }
}
exports.Crypto = Crypto;
//# sourceMappingURL=Crypto.js.map