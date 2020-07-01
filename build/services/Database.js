"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const Base_1 = require("./Base");
const cls_hooked_1 = tslib_1.__importDefault(require("cls-hooked"));
const sequelize_1 = require("sequelize");
sequelize_1.Sequelize.useCLS(cls_hooked_1.default.createNamespace("sequelize"));
class DataBase extends Base_1.BaseService {
    constructor(app) {
        super(app);
        this.models = {};
    }
    static get Op() {
        return sequelize_1.Op;
    }
    init() {
        const options = {
            dialect: "postgres",
            protocol: "postgres",
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        };
        this.client = new sequelize_1.Sequelize(`postgres://${this.config.db.user}:${this.config.db.password}@${this.config.db.host}:5432/${this.config.db.name}`, options);
        this._initModels();
    }
    _initModels() {
        const files = fs_1.default
            .readdirSync(__dirname + "/Models")
            .filter((file) => (file.endsWith(".js") && file !== "index.js") ||
            (file.endsWith(".ts") && file !== "index.ts"));
        for (const file of files) {
            const model = this.client.import(path_1.default.join(__dirname, "Models", file));
            this.models[model.name] = model;
        }
    }
    asyncInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const model of Object.keys(this.models)) {
                yield this.models[model].sync({ force: false });
            }
            for (const [, model] of Object.entries(this.models)) {
                if (model.associate) {
                    model.associate(this.models);
                }
            }
        });
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=Database.js.map