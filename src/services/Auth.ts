import _ from "lodash";
import { IOIDCStrategyOptionWithRequest } from "passport-azure-ad";
import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";

import passport from "passport";
import { Request } from "express";
import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";

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

interface Options {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}

export class AuthService extends BaseService {
  adConfig: IOIDCStrategyOptionWithRequest;
  passport: passport.PassportStatic;
  /**
   * @param {ServiceContainer} services
   */
  constructor(services: ServiceContainer) {
    super(services);

    this.adConfig = _.defaultsDeep(this.config.ad, adCommonConfig);
    this.passport = passport;
  }

  preparePassport() {
    this.passport.use(this.config.auth.JWT, this.prepareStategy());
    this.passport.use("PREJWT", this.prepareStategy());
  }

  prepareStategy() {
    const opts: Options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.config.SECRETJWT,
    };
    return new Strategy(opts, (jwtPayload, done) => {
      this.context.database.models.User.findByPk(jwtPayload.id, {})
        .then((user: any) => {
          if (user && jwtPayload.auth) {
            return done(null, {
              ...user.toJSON(),
              // permissions,
              user_roles: undefined,
              password: undefined,
            });
          }
          return done(null, false);
        })
        .catch((err: any) => {
          console.log(err);
          done(null, false);
        });
    });
  }

  preparePreStategy() {
    const opts: Options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.config.SECRETJWT,
    };
    return new Strategy(opts, (jwtPayload, done) => {
      this.context.database.models.User.findByPk(jwtPayload.id, {})
        .then((user: any) => {
          if (user) {
            return done(null, {
              ...user.toJSON(),
              // permissions,
              user_roles: undefined,
              password: undefined,
            });
          }
          return done(null, false);
        })
        .catch((err: any) => {
          console.log(err);
          done(null, false);
        });
    });
  }
  /**
   * @param {e.Request} req
   * @param {string} iss
   * @param {string} sub
   * @param {GenericPojo} profile
   * @param {function} done
   */
  async verifyActiveDirectory(
    _req: Request,
    _iss: string,
    _sub: string,
    _profile: any,
    done: any
  ) {
    try {
      // const user = await this.context.database.models?.user.findOne({
      //   where: {
      //     email: profile._json.preferred_username
      //   }
      // });

      // if (user) {
      //   return done(null, user);
      // }

      return done(null, false, this.config.error.AD_404);
    } catch (e) {
      done(null, false, this.config.error);
    }
  }

  async asyncInit() {
    this.preparePassport();
  }
}
