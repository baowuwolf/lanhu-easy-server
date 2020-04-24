const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;
const htmlformat = require('./htmlFormat.js')

function init(jsObject) {
  let htmlArr = '';
  jsObject.forEach(item => {
    htmlArr += parseVNode(item).outerHTML
  })
  let htmlStr = htmlformat(htmlArr) // HTML格式化
  return htmlStr
}

// 解析虚拟DOM（生成真实DOM）
function parseVNode(vnode) {
  let _node = null
  _node = document.createElement(vnode.tag || 'div')
  _node.setAttribute('class', vnode.className.split('.')[1])
  
  // 子元素
  let children = vnode.children
  children.forEach(subvnode => {
    _node.appendChild(parseVNode(subvnode))
  })

  return _node
}

module.exports = init