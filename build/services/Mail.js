"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = require("./Base");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
class MailService extends Base_1.BaseService {
    constructor(app) {
        super(app);
        this.transporter = nodemailer_1.default.createTransport({
            auth: {
                pass: this.config.mail.password,
                user: this.config.mail.user,
            },
            host: this.config.mail.host,
            port: this.config.mail.port,
            secure: true,
        });
    }
    mailOptions(subject, text, html, to) {
        return {
            from: `Password <${this.config.mail.user}>`,
            html,
            subject,
            text,
            to,
        };
    }
    sendEmail(mailOption) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                console.log(mailOption);
            }
            catch (error) {
                console.log(mailOption);
            }
        });
    }
}
exports.MailService = MailService;
//# sourceMappingURL=Mail.js.map