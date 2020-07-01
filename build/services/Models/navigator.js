'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const sequelize_1 = require('sequelize');
const _1 = require('./index');
const v4_1 = tslib_1.__importDefault(require('uuid/v4'));
class NavigatorModel extends sequelize_1.Model {
}
exports.NavigatorModel = NavigatorModel;
exports.default = sequelize => {
    NavigatorModel.init({
        uuid_navigator: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: v4_1.default
        },
        uuid: { type: sequelize_1.DataTypes.UUID },
        informations: {
            allowNull: false,
            type: sequelize_1.DataTypes.JSON
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        modelName: _1.Models.Navigator,
        sequelize,
        tableName: _1.Models.Navigator
    });
    return NavigatorModel;
};    //# sourceMappingURL=navigator.js.map
