import _ from "lodash";
import fs from "fs";
import passport from "passport";
import path from "path";
import jsonwebtoken from "jsonwebtoken";

import { ServiceContainer } from "@services/";
import { BaseService } from "../Base";
import { Request, Response, NextFunction } from "express";
import { AuthController } from "./Auth";
import { BaseController } from "./Base";

type Controller = AuthController;

export class ControllerService extends BaseService {
  controllerNames: string[];
  routes: Record<string, Record<string, any>>;

  constructor(services: ServiceContainer) {
    super(services);
    this.controllerNames = [];
    this.routes = {};

    this.setupControllers();
  }

  setupControllers() {
    const basename = path.basename(__filename);

    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file !== "Base.ts" &&
          (file.slice(-3) === ".ts" || file.slice(-3) === ".js") &&
          file !== "Base.js" &&
          file !== "index.ts" &&
          file !== "index.js"
        );
      })
      .forEach((file) => {
        const ControllerConstructor = require(`./${file}`)[
          `${file.replace(".ts", "").replace(".js", "")}Controller`
        ];
        const controller: Controller = new ControllerConstructor(this.context);

        // @ts-ignore
        this[controller.name] = controller;
        this.routes[controller.name] = {};

        this.controllerNames.push(controller.name);
        // @ts-ignore
        const routes = (this[controller.name] as BaseController).getRoutes();
        routes.forEach((route) => {
          this.routes[controller.name][route.action] = route;
        });
      });
  }

  /**
   * @param {express} app
   * @param {BaseController} controller
   */
  registerController(app: any, controller: any) {
    // @ts-ignore
    const routes = (this[controller.name] as BaseController).getRoutes();
    routes.forEach((route: any) => {
      const strategy = _.get(route, "auth");

      if (strategy && strategy !== "NONE") {
        app[route.verb](
          route.url,
          passport.authenticate(strategy, { session: false }),
          (req: Request, res: Response, next: NextFunction) =>
            controller[route.action](req, res, next).catch((e: Error) =>
              this.handleError(e, res)
            )
        );
      } else {
        app[route.verb](
          route.url,
          (req: Request, res: Response, next: NextFunction) =>
            controller[route.action](req, res, next).catch((e: Error) =>
              this.handleError(e, res)
            )
        );
      }
    });
  }

  /**
   * @param {express} app
   */
  registerRoutes(app: any) {
    this.controllerNames.forEach((controllerName: string) => {
      // @ts-ignore
      const controller = this[controllerName];

      this.registerController(app, controller);
    });
  }

  /**
   * @param {Error|BaseError} error
   * @param {e.Response} res
   */
  handleError(error: any, res: Response) {
    console.error(error);

    const errorPayload = {
      fields: _.get(error, "fields"),
      message: _.get(error, "why"),
      stack: _.get(error, "message"),
    };

    if (this.config.ENV === "dev") {
      errorPayload.stack = _.get(error, "stack");
    }

    res.status(error.code ?? 500).json(errorPayload);
  }
}
