import path from "path";
import fs from "fs";

export enum TemplateType {
  inscription = "inscription",
  recommandation_recommandeur = "recommandeur",
  recommandation = "recommandation",
  share_visite_card = "visitecard",
  share_visite_card_without_image = "visitecardWithoutImage"
}
interface Template {
  html: string;
  txt: string;
}
export function getTemplate(type: TemplateType): Template {
  return {
    html: fs.readFileSync(path.join(__dirname, `${type}/index.html`), "utf8"),
    txt: fs.readFileSync(path.join(__dirname, `${type}/index.txt`), "utf8")
  };
}

export function replaceContent(
  contentMapping: Record<string, any>,
  template: Template
) {
  Object.keys(contentMapping).map((key: string) => {
    template.html = template.html
      .split(`%%${key.toUpperCase()}%%`)
      .join(contentMapping[key]);
    template.txt = template.txt
      .split(`%%${key.toUpperCase()}%%`)
      .join(contentMapping[key]);
  });
  return template;
}
