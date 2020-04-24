const Router = require('koa-router');
const router = new Router;

const {
  getFiles,
  fileTransfer,
  createCode
} = require('../controllers/index.js')

router.post('/getFiles', getFiles) // 获取文件夹信息
router.post('/fileTransfer', fileTransfer) // 文件转移（浏览器插件专用）
router.post('/createCode', createCode) // 生成代码（浏览器插件专用）

module.exports = router