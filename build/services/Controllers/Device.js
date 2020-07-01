"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Base_1 = require("./Base");
class DeviceController extends Base_1.BaseController {
    constructor(services) {
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
    setUserAgent(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const created = yield this.context.userAgent.setUserAgent(_req);
            res.status(200).json(created.toJSON());
        });
    }
    getNavigatorInfos(req, res) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userNavigator(req);
            res.status(200).json((_a = user) === null || _a === void 0 ? void 0 : _a.navigators);
        });
    }
    checkNavigatorInformations(req, res) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userNavigator(req);
            const navigators = user.navigators.sort((a, b) => moment_1.default(a.createdAt).isAfter(b.createdAt) ? -1 : 1);
            if (((_a = navigators) === null || _a === void 0 ? void 0 : _a.length) < 2) {
                res.status(200).json({ message: "Not enought navigators" });
            }
            const result = this.context.userAgent.compareTwoLastAgent(JSON.parse(navigators[0].informations), JSON.parse(navigators[1].informations));
            if (result.hasError) {
                this.context.userAgent.sendInformationEmail(req.user);
            }
            res.status(200).json(result);
        });
    }
    userNavigator(req) {
        return this.context.database.models.User.findByPk(req.user.uuid, {
            include: [
                {
                    all: true,
                },
            ],
        });
    }
}
exports.DeviceController = DeviceController;
//# sourceMappingURL=Device.js.map