import cors from "cors";
import express, { Express } from "express";
import http from "http";
import morgan from "morgan";
import path from "path";

import ExpressBrute from "express-brute";
// @ts-ignore
import ExpressIp from "express-ip";
import useragent from "express-useragent";
// @ts-ignore
import SequelizeStore from "express-brute-sequelize";

import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";

/**
 * @class App
 */
export class ServerService extends BaseService {
  bruteforce?: ExpressBrute;
  app: Express;
  server: http.Server | null;

  constructor(services: ServiceContainer) {
    super(services);

    this.app = express();
    this.server = null;
  }

  async asyncInit() {
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "100mb" }));
    this.app.use(cors());

    this.app.use(
      this.context.auth.passport.initialize({ userProperty: "user" })
    );
    await this.setupBruteForce();
    this.app.use(useragent.express());
    this.app.use(ExpressIp().getIpInfoMiddleware);
    this.app.use(this.bruteforce!.prevent);
    this.setupStatic();
    this.context.controller.registerRoutes(this.app);
    this.setupServer();
  }

  setupServer() {
    this.server = http.createServer(this.app);
  }

  setupStatic() {
    this.app.use(
      express.static(path.join(__dirname, "..", "public"), {
        maxAge: "1y",
      })
    );
  }

  async setupBruteForce() {
    return new Promise((res) => {
      new SequelizeStore(
        this.context.database.client,
        "bruteStore",
        {},
        (store: any) => {
          this.bruteforce = new ExpressBrute(store, {
            freeRetries: 15,
            maxWait: 25,
          });
          res();
        }
      );
    });
  }

  start() {
    return this.server!.listen(this.config.API_PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `🚀 Server ready at http://${this.config.API_HOST}:${this.config.API_PORT} for environment "${this.config.ENV}"`
      );
    });
  }
}
