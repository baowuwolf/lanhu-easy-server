const fs = require('fs');
const { readDirToObjTree } = require('../node/rendFile.js');
const htmlVnode = require('../node/html/htmlVnode.js');
const cssAst = require('../node/css/cssast.js');

class WbH5 {

    // 获取文件夹内容
    async getFiles(ctx) {
        let path = ctx.request.body.path
        let filesData = await fs.readdirSync(path);
        ctx.body = {
            filesData: filesData
        }
    }

    // 文件转移 | 转移文件路径，转移地点
    async fileTransfer(ctx) {
        let filePath = ctx.request.body.filePath
        let toFilePath = ctx.request.body.toFilePath

        fs.copyFileSync(filePath, toFilePath)
        ctx.body = {}
    }

    // 生成代码
    async createCode(ctx) {
        let htmlStr = htmlVnode(ctx.request.body.jsObject)
        let cssStr = cssAst(ctx.request.body.jsObject)

        ctx.body = {
            htmlStr,
            cssStr
        } 
    }
}

module.exports = new WbH5()