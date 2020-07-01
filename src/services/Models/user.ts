import { Model, DataTypes, Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import uuid from "uuid/v4";
import { Models } from ".";
import { Models as modelsDB } from "@services/Database";
import { Navigator } from "./navigator";

export interface User {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  recoveryToken: string;
  refreshToken: string;
  otp: string;
}

export class UserModel extends Model {
  public uuid!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public recoveryToken!: string;
  public refreshToken!: string;
  public navigators!: Navigator[];
  public otp!: string;

  static associate(models: modelsDB) {
    models.User.hasMany(models.Navigator, {
      as: "navigators",
      foreignKey: "uuid",
      onDelete: "cascade",
    });
    models.Navigator.belongsTo(models.User, {
      as: "user",
      foreignKey: "uuid",
      onDelete: "cascade",
    });
  }

  public generateToken(type: "Authentication" | "Refresh", auth: boolean) {
    const payload = {
      id: this.uuid,
      type,
      auth,
    };

    let expiresIn;
    switch (type) {
      case "Authentication":
        expiresIn = 36000;
        break;
      case "Refresh":
        expiresIn = "30d";
        break;
      default:
        expiresIn = 36000;
        break;
    }
    return jwt.sign(payload, process.env.SECRETJWT!, {
      expiresIn,
    });
  }
}

export default (sequelize: Sequelize) => {
  UserModel.init(
    {
      uuid: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuid,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      recoveryToken: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      otp: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      modelName: Models.User,
      sequelize,
      tableName: Models.User,
    }
  );

  return UserModel;
};
