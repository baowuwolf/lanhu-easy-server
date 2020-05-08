// 获取文件下载地址（原理：获取用户名称，进行拼接）
var shell = require('shelljs');

let user = shell.exec('echo "$USER"').stdout.replace(/[\r\n]/g, "")
let downloadsPath = `/Users/${user}/Downloads/`

module.exports = downloadsPath