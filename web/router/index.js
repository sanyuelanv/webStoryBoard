const Router = require('koa-router')
const router = new Router()
const {Home} = require('../controller')

router.get('/', Home.home)
router.get('list', Home.list)
router.post('del', Home.del)
router.post('add', Home.add)
router.post('change', Home.change)
router.post('check', Home.check)
module.exports = router
