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
  return vnode.tag == 'img'
    ? createImg(vnode)
    : createDiv(vnode)
}

// 解析生成div
function createDiv(vnode) {
  let _node = null
  _node = document.createElement(vnode.tag)
  _node.setAttribute('class', vnode.className.split('.')[1])
  // 创建文字节点
  if (vnode.innerText) {
    let myText = document.createTextNode(vnode.innerText);
    _node.appendChild(myText);
  }

  // 子元素
  let children = vnode.children
  children.forEach(subvnode => {
    _node.appendChild(parseVNode(subvnode))
  })

  return _node
}

// 解析生成img
function createImg(vnode) {
  // console.log('生成了 img', vnode)
  let _node = null
  _node = document.createElement('img')
  _node.src = vnode.imgSrc;
  _node.setAttribute('class', vnode.className.split('.')[1])
  return _node
}

module.exports = init