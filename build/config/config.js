"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `./src/config/.prod.env`,
});
exports.CONFIG = {
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    ad: {
        clientID: "",
        clientSecret: "",
        cookieEncryptionKeys: [""],
        identityMetadata: "",
        loggingLevel: "",
        redirectUrl: "",
        tenantId: process.env.TENANT,
    },
    mail: {
        user: "",
        password: "",
        port: 123,
        host: "",
    },
    auth: {
        JWT: "JWT",
        REFRESH: "refresh",
        AUTH: "auth",
        ACTIVE_DIRECTORY: "ACTIVE_DIRECTORY",
    },
    ENV: process.env.ENV,
    FRONT_URL: process.env.FRONT_URL,
    API_PORT: process.env.PORT || process.env.API_PORT,
    API_HOST: process.env.API_HOST,
    SECRETJWT: process.env.SECRETJWT,
    error: {
        NOT_FOUND: "NOT_FOUND",
        BAD_REQUEST: "BAD_REQUEST",
        AD_404: "AD_404",
        AD_500: "AD_500",
    },
};
//# sourceMappingURL=config.js.map