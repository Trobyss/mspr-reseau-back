import fs from "fs";
import path from "path";
import uuid from "uuid/v4";

import uuidHolder from "../seeders/uuidHolder.json";

/**
 * @class UuidManager
 */
export class UuidManager {
  uuidHolder: Record<string, Record<string, string>>;

  constructor() {
    this.uuidHolder = uuidHolder;
  }

  /**
   * @param {string} type
   * @param {*} id
   * @param {boolean} [create=true]
   * @returns {string|null}
   */
  getUuid(type: string, id: number, create = true): string | null {
    if (!this.uuidHolder[type]) {
      this.uuidHolder[type] = {};
    }

    if (!this.uuidHolder[type][id]) {
      if (!create) {
        return null;
      }

      this.uuidHolder[type][id] = uuid();
    }

    return this.uuidHolder[type][id];
  }

  persist() {
    const stringifiedUuidHolder = JSON.stringify(this.uuidHolder, null, 2);

    fs.writeFileSync(
      path.join(__dirname, "..", "seeders", "uuidHolder.json"),
      stringifiedUuidHolder
    );
  }
}
