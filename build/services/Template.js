"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = require("./Base");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
class TemplateService extends Base_1.BaseService {
    constructor(app) {
        super(app);
    }
    getTemplate(name) {
        return {
            html: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "templates", name, "index.html"), "utf8"),
            text: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "templates", name, "index.txt"), "utf8"),
        };
    }
    render(content, template) {
        const updatedTemplate = template;
        Object.keys(content).map((key) => {
            updatedTemplate.html = template.html
                .split(`%%${key.toUpperCase()}%%`)
                .join(content[key]);
            updatedTemplate.txt = template.text
                .split(`%%${key.toUpperCase()}%%`)
                .join(content[key]);
        });
        return updatedTemplate;
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=Template.js.map