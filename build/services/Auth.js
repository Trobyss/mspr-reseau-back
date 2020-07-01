"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const passport_jwt_1 = require("passport-jwt");
const passport_1 = tslib_1.__importDefault(require("passport"));
const Base_1 = require("./Base");
const adCommonConfig = {
    clockSkew: 300,
    isB2C: false,
    nonceLifetime: 3600,
    passReqToCallback: true,
    responseMode: "form_post",
    responseType: "id_token",
    scope: ["email", "profile", "openId"],
    useCookieInsteadOfSession: true,
    validateIssuer: true,
};
class AuthService extends Base_1.BaseService {
    constructor(services) {
        super(services);
        this.adConfig = lodash_1.default.defaultsDeep(this.config.ad, adCommonConfig);
        this.passport = passport_1.default;
    }
    preparePassport() {
        this.passport.use(this.config.auth.JWT, this.prepareStategy());
        this.passport.use("PREJWT", this.prepareStategy());
    }
    prepareStategy() {
        const opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.SECRETJWT,
        };
        return new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
            this.context.database.models.User.findByPk(jwtPayload.id, {})
                .then((user) => {
                if (user && jwtPayload.auth) {
                    return done(null, Object.assign(Object.assign({}, user.toJSON()), { user_roles: undefined, password: undefined }));
                }
                return done(null, false);
            })
                .catch((err) => {
                console.log(err);
                done(null, false);
            });
        });
    }
    preparePreStategy() {
        const opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.SECRETJWT,
        };
        return new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
            this.context.database.models.User.findByPk(jwtPayload.id, {})
                .then((user) => {
                if (user) {
                    return done(null, Object.assign(Object.assign({}, user.toJSON()), { user_roles: undefined, password: undefined }));
                }
                return done(null, false);
            })
                .catch((err) => {
                console.log(err);
                done(null, false);
            });
        });
    }
    verifyActiveDirectory(_req, _iss, _sub, _profile, done) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return done(null, false, this.config.error.AD_404);
            }
            catch (e) {
                done(null, false, this.config.error);
            }
        });
    }
    asyncInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.preparePassport();
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=Auth.js.map