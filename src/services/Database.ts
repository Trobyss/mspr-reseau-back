import fs from "fs";
import path from "path";
import { BaseService } from "./Base";
import cls from "cls-hooked";
import { Sequelize, Op, Model, Options } from "sequelize";
import { ServiceContainer } from "@services/";
import { UserModel } from "./Models/user";
import { NavigatorModel } from "./Models/navigator";

// used to automate transaction propagation:
// https://sequelize.org/master/manual/transactions.html#automatically-pass-transactions-to-all-queries
Sequelize.useCLS(cls.createNamespace("sequelize"));

export interface Models {
  User: typeof UserModel;
  Navigator: typeof NavigatorModel;
}

/**
 * @class Db
 * @extends BaseService
 * @property {Sequelize} client
 * @property {Models} models
 */
export class DataBase extends BaseService {
  client!: Sequelize | undefined;
  models: Models;

  constructor(app: ServiceContainer) {
    super(app);

    /**
     * @type Models
     */

    // @ts-ignore
    this.models = {};
  }

  static get Op() {
    return Op;
  }

  init() {
    const options: Options = {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };

    this.client = new Sequelize(
      `postgres://${this.config.db.user}:${this.config.db.password}@${this.config.db.host}:5432/${this.config.db.name}`,
      options
    );

    this._initModels();
  }

  _initModels() {
    const files = fs
      .readdirSync(__dirname + "/Models")
      .filter(
        (file) =>
          (file.endsWith(".js") && file !== "index.js") ||
          (file.endsWith(".ts") && file !== "index.ts")
      );

    for (const file of files) {
      const model = this.client!.import(path.join(__dirname, "Models", file));
      // @ts-ignore
      this.models[model.name] = model;
    }
  }

  async asyncInit() {
    // await this.client.drop();
    for (const model of Object.keys(this.models)) {
      await this.models[model as keyof Models].sync({ force: false });
    }
    for (const [, model] of Object.entries(this.models)) {
      if (model.associate) {
        model.associate(this.models);
      }
    }
  }
}
