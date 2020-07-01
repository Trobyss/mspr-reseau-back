"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = require("./Base");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
class UserAgentService extends Base_1.BaseService {
    constructor(services) {
        super(services);
    }
    setUserAgent(req) {
        const trueKeys = Object.keys(req.useragent).filter((k) => req.useragent[k]);
        const navigator = trueKeys.reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr]: req.useragent[curr] })), {});
        return this.context.database.models.Navigator.create({
            uuid: req.user.uuid,
            informations: JSON.stringify(Object.assign(Object.assign({}, navigator), req.ipInfo)),
        });
    }
    compareTwoLastAgent(agentOne, agentTwo) {
        const error = {
            browser: false,
            global: false,
            ip: false,
            os: false,
        };
        if (agentOne.browser !== agentTwo.browser) {
            error.browser = true;
        }
        if (agentOne.ip !== agentTwo.ip) {
            error.ip = true;
        }
        if (agentOne.os !== agentTwo.os) {
            error.os = true;
        }
        const isOfAgentOne = Object.keys(agentOne).filter((key) => key.startsWith("is"));
        const isOfAgentTwo = Object.keys(agentTwo).filter((key) => key.startsWith("is"));
        if (!lodash_1.default.isEqual(isOfAgentOne.sort(), isOfAgentTwo.sort())) {
            error.global = true;
        }
        return {
            hasError: lodash_1.default.values(error).some((val) => val === true),
            error,
        };
    }
    sendInformationEmail(user) {
        const template = this.context.template.getTemplate("browser");
        const render = this.context.template.render({}, template);
        return this.context.mail.sendEmail({
            from: "Les Gaulois",
            to: user.email,
            subject: `[Sécurité]: Une connexion inhabituelle a été détectée !`,
            html: render.html,
            text: render.txt,
        });
    }
}
exports.UserAgentService = UserAgentService;
//# sourceMappingURL=UserAgent.js.map