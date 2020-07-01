"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const express_brute_1 = tslib_1.__importDefault(require("express-brute"));
const express_ip_1 = tslib_1.__importDefault(require("express-ip"));
const express_useragent_1 = tslib_1.__importDefault(require("express-useragent"));
const express_brute_sequelize_1 = tslib_1.__importDefault(require("express-brute-sequelize"));
const Base_1 = require("./Base");
class ServerService extends Base_1.BaseService {
    constructor(services) {
        super(services);
        this.app = express_1.default();
        this.server = null;
    }
    asyncInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.app.use(morgan_1.default("dev"));
            this.app.use(cors_1.default());
            this.app.use(express_1.default.json({ limit: "100mb" }));
            this.app.use(express_1.default.urlencoded({ extended: true, limit: "100mb" }));
            this.app.use(cors_1.default());
            this.app.use(this.context.auth.passport.initialize({ userProperty: "user" }));
            yield this.setupBruteForce();
            this.app.use(express_useragent_1.default.express());
            this.app.use(express_ip_1.default().getIpInfoMiddleware);
            this.app.use(this.bruteforce.prevent);
            this.setupStatic();
            this.context.controller.registerRoutes(this.app);
            this.setupServer();
        });
    }
    setupServer() {
        this.server = http_1.default.createServer(this.app);
    }
    setupStatic() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public"), {
            maxAge: "1y",
        }));
    }
    setupBruteForce() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((res) => {
                new express_brute_sequelize_1.default(this.context.database.client, "bruteStore", {}, (store) => {
                    this.bruteforce = new express_brute_1.default(store, {
                        freeRetries: 15,
                        maxWait: 25,
                    });
                    res();
                });
            });
        });
    }
    start() {
        return this.server.listen(this.config.API_PORT, () => {
            console.log(`🚀 Server ready at http://${this.config.API_HOST}:${this.config.API_PORT} for environment "${this.config.ENV}"`);
        });
    }
}
exports.ServerService = ServerService;
//# sourceMappingURL=Server.js.map