import { ServiceContainer } from "@services/";
import { BaseService } from "../Base";
import Express from "express";

/**
 * @class BaseController
 * @extends BaseService
 * @property {string} name
 * @property {Routes} routes
 * @property {ServiceContainer} services
 */

interface Routes {
  action: string;
  auth: string;
  controller?: string;
  url: string;
  verb: string;
}

export class BaseController extends BaseService {
  name: string;
  routes: Routes[];

  /**
   * @param {ServiceContainer} services
   * @param {string} name
   * @param {Routes} routes
   */
  constructor(services: ServiceContainer, name: string, routes: Routes[]) {
    super(services);
    this.name = name;
    this.routes = routes;
  }

  /**
   * @returns {Routes}
   */
  getRoutes() {
    return this.routes.map(route => {
      return {
        action: route.action,
        auth: route.auth,
        controller: this.name,
        url: `/${this.name}${route.url}`,
        verb: route.verb
      };
    });
  }

  /**
   *
   * @param {e.Response} res
   * @protected
   */
  _sendEmpty(res: Express.Response) {
    res.type("png");
    res.send(
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        "base64"
      )
    );
  }
}
