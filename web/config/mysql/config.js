let host =  '127.0.0.1'
let password = '123456'
let user = "root"
let port  = 3306
// 数据库名字 ：node_test + Conf
const node_testConf = {
  host,
  password,
  user,
  port,
  database:'node_test',
};

module.exports = { node_testConf }
