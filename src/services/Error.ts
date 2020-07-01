import { BaseService } from "./Base";
import { BaseError } from "./Errors/Base";
import fs from "fs";
import { ServiceContainer } from "@services/";
import { ForbiddenError } from "./Errors/Forbidden";
import { NotFoundError } from "./Errors/NotFound";
import { BadRequestError } from './Errors/BadRequest';

/**
 * @class ErrorService
 * @property {BadRequestError} BadRequest
 */
export class ErrorService extends BaseService {
  Forbidden!: typeof ForbiddenError;
  NotFound!: typeof NotFoundError;
  Base!: typeof BaseError;
  BadRequest!: typeof BadRequestError;

  constructor(app: ServiceContainer) {
    super(app);
    this.setupErrors();
  }

  setupErrors() {
    const files = fs
      .readdirSync(__dirname + "/Errors")
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of files) {
      const ErrorConstructor = require(__dirname + "/Errors/" + file)[
        `${file.replace(".ts", "").replace(".js", "")}Error`
      ];
      // @ts-ignore
      this[ErrorConstructor.name.replace("Error", "")] = ErrorConstructor;
    }
  }
}
