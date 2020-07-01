'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const sequelize_1 = require('sequelize');
const jsonwebtoken_1 = tslib_1.__importDefault(require('jsonwebtoken'));
const v4_1 = tslib_1.__importDefault(require('uuid/v4'));
const _1 = require('./index');
class UserModel extends sequelize_1.Model {
    static associate(models) {
        models.User.hasMany(models.Navigator, {
            as: 'navigators',
            foreignKey: 'uuid',
            onDelete: 'cascade'
        });
        models.Navigator.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'uuid',
            onDelete: 'cascade'
        });
    }
    generateToken(type, auth) {
        const payload = {
            id: this.uuid,
            type,
            auth
        };
        let expiresIn;
        switch (type) {
        case 'Authentication':
            expiresIn = 36000;
            break;
        case 'Refresh':
            expiresIn = '30d';
            break;
        default:
            expiresIn = 36000;
            break;
        }
        return jsonwebtoken_1.default.sign(payload, process.env.SECRETJWT, { expiresIn });
    }
}
exports.UserModel = UserModel;
exports.default = sequelize => {
    UserModel.init({
        uuid: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: v4_1.default
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        recoveryToken: {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true
        },
        refreshToken: {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true
        },
        otp: {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        modelName: _1.Models.User,
        sequelize,
        tableName: _1.Models.User
    });
    return UserModel;
};    //# sourceMappingURL=user.js.map
