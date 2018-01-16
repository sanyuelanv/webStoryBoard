const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const statics = require('koa-static')
const Router = require('koa-router')
const ViewConfig = require('./config/view')
const errorFunc = require('./config/error')
const logger = require('./config/logger')
const port = require('./config/port')
const redisCache = require('./config/redis')
const index = require('./router/index')
const router = new Router
const app = new Koa()
// 日志打印
app.use(logger)
// 配置错误处理
app.use(errorFunc)
// redis 缓存
app.use(redisCache('sanyue'));
// 配置body解析器：支持json和form表单
app.use(bodyParser())
// 配置静态文件路径
app.use(statics(ViewConfig.static))
// 配置模版文件:EJS
app.use(views(ViewConfig.view, { extension: 'ejs' }))
// 配置路由
router.use('/', index.routes(), index.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// 处理错误
app.on('error', (err)=>{
  console.log(err)
})
app.listen(process.env.PORT || port)
