"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = require("./Base");
const ms_rest_azure_1 = tslib_1.__importDefault(require("ms-rest-azure"));
const wildleek_1 = tslib_1.__importDefault(require("wildleek"));
wildleek_1.default.eagerLoadPasswords();
class AuthController extends Base_1.BaseController {
    constructor(services) {
        super(services, "auth", [
            {
                action: "loginActiveDirectory",
                auth: "NONE",
                url: "/ad_login",
                verb: "post",
            },
            {
                action: "test",
                auth: "JWT",
                url: "/private",
                verb: "get",
            },
            {
                action: "verifyOtp",
                auth: "NONE",
                url: "/loginOtp",
                verb: "post",
            },
        ]);
    }
    verifyOtp(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.context.database.models.User.findByPk(req.body.uid);
            if (!user) {
                throw new this.context.error.NotFound(this.config.error.NOT_FOUND, "Utilisateur introuvable");
            }
            if (user.otp !== req.body.otp) {
                throw new this.context.error.Forbidden("Le mot de passe de confirmation n'est pas valide");
            }
            const token = user.generateToken("Authentication", true);
            res.status(200).json({ message: "ok", token });
        });
    }
    loginActiveDirectory(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const weakness = yield wildleek_1.default(req.body.password);
            return ms_rest_azure_1.default.loginWithUsernamePassword(req.body.email, req.body.password, { domain: this.config.ad.tenantId }, (err, credentials, _subscriptions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res
                        .status(401)
                        .json({ message: "Bad credentials", err, credentials, weakness });
                }
                const otp = yield this.context.crypto.generateOTP();
                const [user, created,] = yield this.context.database.models.User.findOrCreate({
                    where: {
                        email: req.body.email,
                    },
                    defaults: {
                        email: req.body.email,
                        otp,
                    },
                });
                if (!created) {
                    yield user.update({ otp });
                }
                const template = this.context.template.getTemplate("otp");
                const render = this.context.template.render({ otp }, template);
                yield this.context.mail.sendEmail({
                    from: "Les Gaulois",
                    to: user.email,
                    subject: `[Authentification]: Vous avez été reçu votre code d'authentification !`,
                    html: render.html,
                    text: render.txt,
                });
                res.status(200).json({
                    uid: user.uuid,
                    weakness,
                });
            }));
        });
    }
    test(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: "ok" });
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=Auth.js.map