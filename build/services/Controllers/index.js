"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const path_1 = tslib_1.__importDefault(require("path"));
const Base_1 = require("../Base");
class ControllerService extends Base_1.BaseService {
    constructor(services) {
        super(services);
        this.controllerNames = [];
        this.routes = {};
        this.setupControllers();
    }
    setupControllers() {
        const basename = path_1.default.basename(__filename);
        fs_1.default.readdirSync(__dirname)
            .filter((file) => {
            return (file.indexOf(".") !== 0 &&
                file !== basename &&
                file !== "Base.ts" &&
                (file.slice(-3) === ".ts" || file.slice(-3) === ".js") &&
                file !== "Base.js" &&
                file !== "index.ts" &&
                file !== "index.js");
        })
            .forEach((file) => {
            const ControllerConstructor = require(`./${file}`)[`${file.replace(".ts", "").replace(".js", "")}Controller`];
            const controller = new ControllerConstructor(this.context);
            this[controller.name] = controller;
            this.routes[controller.name] = {};
            this.controllerNames.push(controller.name);
            const routes = this[controller.name].getRoutes();
            routes.forEach((route) => {
                this.routes[controller.name][route.action] = route;
            });
        });
    }
    registerController(app, controller) {
        const routes = this[controller.name].getRoutes();
        routes.forEach((route) => {
            const strategy = lodash_1.default.get(route, "auth");
            if (strategy && strategy !== "NONE") {
                app[route.verb](route.url, passport_1.default.authenticate(strategy, { session: false }), (req, res, next) => controller[route.action](req, res, next).catch((e) => this.handleError(e, res)));
            }
            else {
                app[route.verb](route.url, (req, res, next) => controller[route.action](req, res, next).catch((e) => this.handleError(e, res)));
            }
        });
    }
    registerRoutes(app) {
        this.controllerNames.forEach((controllerName) => {
            const controller = this[controllerName];
            this.registerController(app, controller);
        });
    }
    handleError(error, res) {
        var _a;
        console.error(error);
        const errorPayload = {
            fields: lodash_1.default.get(error, "fields"),
            message: lodash_1.default.get(error, "why"),
            stack: lodash_1.default.get(error, "message"),
        };
        if (this.config.ENV === "dev") {
            errorPayload.stack = lodash_1.default.get(error, "stack");
        }
        res.status((_a = error.code, (_a !== null && _a !== void 0 ? _a : 500))).json(errorPayload);
    }
}
exports.ControllerService = ControllerService;
//# sourceMappingURL=index.js.map