import { Model, DataTypes, Sequelize } from "sequelize";
import { Models } from ".";
import uuid from "uuid/v4";

export interface Navigator {
  uuid: string;
  informations: string;
  createdAt: Date;
}

export class NavigatorModel extends Model {
  public uuid!: string;
  public informations!: string;
}

export default (sequelize: Sequelize) => {
  NavigatorModel.init(
    {
      uuid_navigator: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuid,
      },
      uuid: {
        type: DataTypes.UUID,
      },
      informations: {
        allowNull: false,
        type: DataTypes.JSON,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      modelName: Models.Navigator,
      sequelize,
      tableName: Models.Navigator,
    }
  );

  return NavigatorModel;
};
