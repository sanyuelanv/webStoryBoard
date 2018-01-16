const {test_tables} = require('../model/node_test')
const { Op } = require('sequelize')
//http://docs.sequelizejs.com/manual/tutorial/querying.html
let Home = {
  home:async (ctx) => {
    let title = "TEST"
    await ctx.render('index', {title:title});
  },
  list:async (ctx) => {
    const {query} = ctx.request
    let attributes = ["id","str","num"]
    let order = [['id','ASC']]
    let findCommand = {attributes,order}
    try {
      let list = await test_tables.findAll(findCommand)
      const data = {
        state:200,
        data:list
      }
      ctx.body = data
    }
    catch (e) {
      ctx.body = {
        state:101,
        data:"数据库错误"
      }
    }
  },
  del:async (ctx) => {
    const {body} = ctx.request;
    let { id } = body
    if(id == ''){
      ctx.body = {
        state:102,
        data:{errMgs:"参数不对"}
      }
    }
    else {
      try {
        let res = await test_tables.destroy({where:{id}})
        if(res == 0){
          ctx.body = {
            state:103,
            data:"无此ID"
          }
        }
        else {
          ctx.body = {
            state:200,
            data:{id}
          }
        }
      }
      catch (e) {
        console.log(e);
        ctx.body = {
          state:101,
          data:"数据库错误"
        }
      }
    }
  },
  add:async (ctx) => {
    const {body} = ctx.request;
    let { str,num } = body
    if(str == "" || num == ""){
      ctx.body = {
        state:102,
        data:"参数不对"
      }
    }
    else {
      try {
        let res = await test_tables.create({str,num})
        let { id } = res.dataValues
        ctx.body = {
          state:200,
          data:{id,str,num}
        }
      }
      catch (e) {
        console.log(e);
        ctx.body = {
          state:101,
          data:"数据库错误"
        }
      }
    }
  },
  change:async (ctx) => {},
  check:async (ctx) => {},
}
module.exports = Home
