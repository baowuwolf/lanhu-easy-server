const fs = require('fs');

/**
 * 读取文件目录，生成element.ui的tree
 * @param { String } targetPath 读取文件夹的绝对路径
 * @return { Array } [文件数, element.ui tree object]
 * @author 朱昆鹏
 * @time 2019/12/1 20:59 第一次重构
 */
function readDirToObjTree(targetPath){

  let objTree = []
  let fileNum = 0 // 文件数量

  function recursion (targetPath, children, isRootPath = true) {

      let files = fs.readdirSync(targetPath)

    console.log('files', files);

      // 1.目录循环
      files.forEach(item => {

        // 过滤条件
        if (item === 'img' || item === '.DS_Store' || item === 'node_modules') return;

          let isDir = fs.statSync(`${targetPath}/${item}`).isDirectory()

          // 核心数据处理（是文件，并且不是以 .开头的隐藏文件，并且不是 node_modules && build）
          if (isDir && !/^\./.test(item)) {
              // console.log('🔥 可以进入到生成目录的文件夹', item)
              children.push({
                  label: item,
                  children: [],
                  path: `${targetPath}/${item}`
              })
          } else {
            // console.log('✅ 不是文件夹')
            fileNum += 1
            children.push({
              label: item,
              path: `${targetPath}/${item}`
            });
          }
      })

      // 2.遍历目录循环（递归）
      children.length > 0 && children[0].label !== undefined 
          ? children.forEach(item => { if (item.children) recursion(item.path, item.children, false) })
          : ''
  }

  recursion(targetPath, objTree)

  // console.log('文件数量：', fileNum);
  return objTree
}

module.exports = {
  readDirToObjTree
}