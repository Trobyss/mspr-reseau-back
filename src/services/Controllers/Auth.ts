import { ServiceContainer } from "@services/";
import { Request, Response } from "express";
import { BaseController } from "./Base";
import msRestAzure from "ms-rest-azure";
// @ts-ignore
import commonPassword from "wildleek";

commonPassword.eagerLoadPasswords();

/**
 * @class AuthController
 * @extends BaseController
 */
export class AuthController extends BaseController {
  /**
   * @param {ServiceContainer} services
   */
  constructor(services: ServiceContainer) {
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

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async verifyOtp(req: Request, res: Response) {
    const user = await this.context.database.models.User.findByPk(req.body.uid);

    if (!user) {
      throw new this.context.error.NotFound(
        this.config.error.NOT_FOUND,
        "Utilisateur introuvable"
      );
    }

    if (user.otp !== req.body.otp) {
      throw new this.context.error.Forbidden(
        "Le mot de passe de confirmation n'est pas valide"
      );
    }

    const token = user.generateToken("Authentication", true);

    res.status(200).json({ message: "ok", token });
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async loginActiveDirectory(req: Request, res: Response) {
    const weakness = await commonPassword(req.body.password);

    return msRestAzure.loginWithUsernamePassword(
      req.body.email,
      req.body.password,
      { domain: this.config.ad.tenantId },
      async (err, credentials, _subscriptions) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Bad credentials", err, credentials, weakness });
        }
        const otp = await this.context.crypto.generateOTP();

        const [
          user,
          created,
        ] = await this.context.database.models.User.findOrCreate({
          where: {
            email: req.body.email,
          },
          defaults: {
            email: req.body.email,
            otp,
          },
        });

        console.log("Good");

        if (!created) {
          await user.update({ otp });
        }
        const template = this.context.template.getTemplate("otp");
        const render = this.context.template.render({ otp }, template);

        await this.context.mail.sendEmail({
          from: "Les Gaulois",
          to: user.email,
          subject: `[Authentification]: Vous avez été reçu votre code d'authentification !`,
          html: render.html,
          text: render.txt,
        });
        // credentials.getToken((_err, token) =>
        res.status(200).json({
          uid: user.uuid,
          weakness,
        });
        // );
      }
    );
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async test(_req: Request, res: Response) {
    res.status(200).json({ message: "ok" });
  }
}
