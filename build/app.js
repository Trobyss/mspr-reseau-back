'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const _services_1 = require('./services/index');
const app = new _services_1.ServiceContainer();
app.init().then(() => {
    app.server.start();
});    //# sourceMappingURL=app.js.map
