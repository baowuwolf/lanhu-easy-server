const fs = require('fs');

/**
 * 传入一个文件夹路径，返回这个文件夹下所有的文件路径数组
 * @param { String } 文件夹路径
 * @return { Array } 此文件夹下所有的文件相对路径数组
 * @author 朱昆鹏
 * @time 2019/11/25 22:10
 */
function readDirToPathArr(foldPath) {
  let pathArr = []

  function recursion(foldPath, children) {
    let files = fs.readdirSync(foldPath)
    files.forEach(item => {
      if (item === '.DS_Store') return;
      let isDir = fs.statSync(`${foldPath}/${item}`).isDirectory(); // 是否是文件夹
      isDir
        ? recursion(`${foldPath}/${item}`)
        : pathArr.push(`${foldPath}/${item}`)
    })
  }

  recursion(foldPath)
  return pathArr
}

/**
 * 过滤掉数组中非中文的项
 * @param { Array } 原始数组
 * @return { Array } 去除掉非中文的项的数组
 * @author 朱昆鹏
 * @time 2019/12/1 20:19
 */
function nonChineseTool(textArr) {
  let arr = []
  textArr.forEach(item => {
    // 匹配连续中文...
    // let names = item.match(/[\u4e00-\u9fa5]+/g);
    // if (names) {
    //   arr = [...arr, ...names]
    // }
    let resD = /[\u4e00-\u9fa5]+/.test(item)
    if (resD) arr.push(item)
  })
  return arr;
}

module.exports = {
  readDirToPathArr: readDirToPathArr,
  nonChineseTool: nonChineseTool
}