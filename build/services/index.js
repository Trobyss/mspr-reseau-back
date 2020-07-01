'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const Auth_1 = require('./Auth');
const Crypto_1 = require('./Crypto');
const Database_1 = require('./Database');
const Error_1 = require('./Error');
const Mail_1 = require('./Mail');
const String_1 = require('./String');
const Template_1 = require('./Template');
const Server_1 = require('./Server');
const Controllers_1 = require('./Controllers/index');
const UserAgent_1 = require('./UserAgent');
class ServiceContainer {
    constructor() {
        this.crypto = new Crypto_1.Crypto(this);
        this.database = new Database_1.DataBase(this);
        this.string = new String_1.StringService(this);
        this.auth = new Auth_1.AuthService(this);
        this.error = new Error_1.ErrorService(this);
        this.mail = new Mail_1.MailService(this);
        this.template = new Template_1.TemplateService(this);
        this.server = new Server_1.ServerService(this);
        this.controller = new Controllers_1.ControllerService(this);
        this.userAgent = new UserAgent_1.UserAgentService(this);
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const serviceName of [
                    'database',
                    'auth',
                    'server'
                ]) {
                this[serviceName].init();
                yield this[serviceName].asyncInit();
            }
        });
    }
}
exports.ServiceContainer = ServiceContainer;    //# sourceMappingURL=index.js.map
