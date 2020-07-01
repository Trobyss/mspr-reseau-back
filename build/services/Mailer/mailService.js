"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "msprgaulois@gmail.com",
        pass: "Lesgauloissontlesplusfort34"
    }
});
exports.sendEmail = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield transporter.sendMail(options);
});
//# sourceMappingURL=mailService.js.map