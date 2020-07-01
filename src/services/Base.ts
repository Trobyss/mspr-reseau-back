import { CONFIG, Config } from "@config/";
import { ServiceContainer } from "@services/";

export class BaseService {
  config: Config;
  context: ServiceContainer;

  constructor(app: ServiceContainer) {
    this.context = app;
    this.config = CONFIG;
  }

  init() {
    // do nothing
  }

  async asyncInit() {
    // do nothing
  }
}
