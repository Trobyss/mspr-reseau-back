import { AuthService } from "./Auth";
import { Crypto } from "./Crypto";
import { DataBase } from "./Database";
import { ErrorService } from "./Error";
import { MailService } from "./Mail";
import { StringService } from "./String";
import { TemplateService } from "./Template";
import { ServerService } from "./Server";
import { ControllerService } from "./Controllers";
import { UserAgentService } from "./UserAgent";

export class ServiceContainer {
  crypto: Crypto;
  database: DataBase;
  string: StringService;
  auth: AuthService;
  error: ErrorService;
  mail: MailService;
  template: TemplateService;
  server: ServerService;
  controller: ControllerService;
  userAgent: UserAgentService;

  constructor() {
    this.crypto = new Crypto(this);
    this.database = new DataBase(this);
    this.string = new StringService(this);
    this.auth = new AuthService(this);
    this.error = new ErrorService(this);
    this.mail = new MailService(this);
    this.template = new TemplateService(this);
    this.server = new ServerService(this);
    this.controller = new ControllerService(this);
    this.userAgent = new UserAgentService(this);
  }

  async init() {
    for (const serviceName of ["database", "auth", "server"]) {
      // @ts-ignore
      this[serviceName].init();
      // @ts-ignore
      await this[serviceName].asyncInit();
    }
  }
}
