const Sequelize = require('sequelize')
const { node_testConf } = require('./config')
// 数据库名字 + Instance
let node_testInstance = new Sequelize(node_testConf.database, node_testConf.user, node_testConf.password, {
  host: node_testConf.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})
module.exports = { node_testInstance }
