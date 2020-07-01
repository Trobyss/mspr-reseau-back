"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
var TemplateType;
(function (TemplateType) {
    TemplateType["inscription"] = "inscription";
    TemplateType["recommandation_recommandeur"] = "recommandeur";
    TemplateType["recommandation"] = "recommandation";
    TemplateType["share_visite_card"] = "visitecard";
    TemplateType["share_visite_card_without_image"] = "visitecardWithoutImage";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
function getTemplate(type) {
    return {
        html: fs_1.default.readFileSync(path_1.default.join(__dirname, `${type}/index.html`), "utf8"),
        txt: fs_1.default.readFileSync(path_1.default.join(__dirname, `${type}/index.txt`), "utf8")
    };
}
exports.getTemplate = getTemplate;
function replaceContent(contentMapping, template) {
    Object.keys(contentMapping).map((key) => {
        template.html = template.html
            .split(`%%${key.toUpperCase()}%%`)
            .join(contentMapping[key]);
        template.txt = template.txt
            .split(`%%${key.toUpperCase()}%%`)
            .join(contentMapping[key]);
    });
    return template;
}
exports.replaceContent = replaceContent;
//# sourceMappingURL=index.js.map