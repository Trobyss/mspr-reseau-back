import { ServiceContainer } from "@services/";
import { Request, Response } from "express";
import moment from "moment";
import { BaseController } from "./Base";
import { User } from "@services/Models/user";


/**
 * @class DeviceController
 * @extends BaseController
 */
export class DeviceController extends BaseController {
  /**
   * @param {ServiceContainer} services
   */
  constructor(services: ServiceContainer) {
    super(services, "device", [
      {
        action: "getNavigatorInfos",
        auth: "JWT",
        url: "/informations",
        verb: "get",
      },
      {
        action: "setUserAgent",
        auth: "JWT",
        url: "/create",
        verb: "get",
      },
      {
        action: "checkNavigatorInformations",
        auth: "JWT",
        url: "/check",
        verb: "get",
      },
    ]);
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async setUserAgent(_req: Request, res: Response) {
    const created = await this.context.userAgent.setUserAgent(_req);
    res.status(200).json(created.toJSON());
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async getNavigatorInfos(req: Request, res: Response) {
    const user = await this.userNavigator(req);
    res.status(200).json(user?.navigators);
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async checkNavigatorInformations(req: Request, res: Response) {
    const user = await this.userNavigator(req);
    const navigators = user!.navigators.sort((a, b) =>
      moment(a.createdAt).isAfter(b.createdAt) ? -1 : 1
    );

    if (navigators?.length < 2) {
      res.status(200).json({ message: "Not enought navigators" });
    }

    const result = this.context.userAgent.compareTwoLastAgent(
      JSON.parse(navigators[0].informations),
      JSON.parse(navigators[1].informations)
    );

    if (result.hasError) {
      this.context.userAgent.sendInformationEmail(req.user as User);
    }

    res.status(200).json(result);
  }

  userNavigator(req: Request) {
    return this.context.database.models.User.findByPk((req.user as User).uuid, {
      include: [
        {
          all: true,
        },
      ],
    });
  }
}
