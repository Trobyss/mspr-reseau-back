import { ServiceContainer } from "@services/";
import { BaseService } from "./Base";
import fs from "fs";
import path from "path";

// TODO
export class TemplateService extends BaseService {
  constructor(app: ServiceContainer) {
    super(app);
  }

  /**
   *
   * @param {string} name
   * @returns {object}
   */
  getTemplate(name: string) {
    return {
      html: fs.readFileSync(
        path.join(__dirname, "..", "templates", name, "index.html"),
        "utf8"
      ),
      text: fs.readFileSync(
        path.join(__dirname, "..", "templates", name, "index.txt"),
        "utf8"
      ),
    };
  }

  /**
   *
   * @param {Record<string, string|number>} content
   * @param {object} template
   * @returns {object}
   */
  render(content: Record<string, string>, template: Record<string, string>) {
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
