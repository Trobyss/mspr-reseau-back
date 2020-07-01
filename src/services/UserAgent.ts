import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";
import { Request } from "express";
import { UserModel, User } from "./Models/user";
import _ from "lodash";

export class UserAgentService extends BaseService {
  constructor(services: ServiceContainer) {
    super(services);
  }

  setUserAgent(req: Request) {
    const trueKeys = Object.keys(req.useragent!).filter(
      // @ts-ignore
      (k: string) => req.useragent![k]
    );

    const navigator = trueKeys.reduce(
      // @ts-ignore
      (prev, curr) => ({ ...prev, [curr]: req.useragent![curr] }),
      {}
    );

    return this.context.database.models.Navigator.create({
      uuid: (req.user as UserModel).uuid,
      informations: JSON.stringify({
        ...navigator,
        // @ts-ignore
        ...req.ipInfo,
      }),
    });
  }

  compareTwoLastAgent(
    agentOne: Record<string, any>,
    agentTwo: Record<string, any>
  ) {
    const error: Record<string, boolean> = {
      browser: false,
      global: false,
      ip: false,
      os: false,
    };

    // check browser
    if (agentOne.browser !== agentTwo.browser) {
      error.browser = true;
    }

    // check ip
    if (agentOne.ip !== agentTwo.ip) {
      error.ip = true;
    }

    // check os
    if (agentOne.os !== agentTwo.os) {
      error.os = true;
    }

    // check isXXX key
    const isOfAgentOne = Object.keys(agentOne).filter((key) =>
      key.startsWith("is")
    );

    const isOfAgentTwo = Object.keys(agentTwo).filter((key) =>
      key.startsWith("is")
    );

    if (!_.isEqual(isOfAgentOne.sort(), isOfAgentTwo.sort())) {
      error.global = true;
    }

    return {
      hasError: _.values(error).some((val) => val === true),
      error,
    };
  }

  sendInformationEmail(user: User) {
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
