// 启动服务端...
const Koa = require('koa');
const app = new Koa();
const bodyBody = require('koa-body') // 解析请求体
const cors = require('koa2-cors'); // 解决跨域问题
const routing = require('./routes/router.js') // 加载路由文件

app.use(cors());
app.use(bodyBody()) // 解析 请求body中的 JSON
routing(app) // 路由注册

app.listen(3336, () => console.log('服务端启动成功...，端口是 3366'))