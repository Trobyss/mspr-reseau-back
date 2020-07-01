import { ServiceContainer } from "@services/";

const app = new ServiceContainer();

app.init().then(() => {
  app.server.start();
});
