const Router = require('koa-router');
const router = new Router;

const {
  getFiles,
  fileTransfer,
  createCode,
  getDownload
} = require('../controllers/index.js')

router.post('/getFiles', getFiles) // 获取文件夹信息
router.get('/getDownload', getDownload) // 获取浏览器下载地址
router.post('/fileTransfer', fileTransfer) // 文件转移（浏览器插件专用）
router.post('/createCode', createCode) // 生成代码（浏览器插件专用）

module.exports = router