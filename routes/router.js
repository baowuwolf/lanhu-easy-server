// router 挂载注册函数

const fs = require('fs')

// 遍历routes下所有的文件，生成routes对象
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'router.js') {return;}
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}