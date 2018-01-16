const { DataTypes } = require('sequelize')
const { node_testInstance } = require('../config/mysql')
let node_testModel = {}
// 数据库名字 + Model ／ 表名
node_testModel.test_tables = node_testInstance.define(
  'test_tables',
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement:true,
    },
    str: DataTypes.TEXT(),
    num: DataTypes.INTEGER(11),
  },
  {
    freezeTableName: true,
    tableName:'test_tables',
    timestamps: false,
    'createdAt': false,
  }
);
module.exports = node_testModel
