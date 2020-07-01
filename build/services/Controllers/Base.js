"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
class BaseController extends Base_1.BaseService {
    constructor(services, name, routes) {
        super(services);
        this.name = name;
        this.routes = routes;
    }
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
    _sendEmpty(res) {
        res.type("png");
        res.send(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64"));
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=Base.js.map