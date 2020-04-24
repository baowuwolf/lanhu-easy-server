// css to tree
var csstree = require('css-tree');

// 入口函数
function init(jsObject) {
  let cssAst = jsToCssAst(jsObject)

  // 从AST生成CSS
  let cssString = csstree.generate(cssAst)

  // CSS 转 less
  let css2less = require('./css2less')
  let result = css2less(cssString, {});
  
  return result
}

// JS TO CSS AST
function jsToCssAst(jsObject) {
  let cssAstArr = createAstFor(jsObject)
  return {
    type: 'StyleSheet',
    loc: null,
    children: cssAstArr
  }
}

// 基本对象生成循环函数
function createAstFor(jsObject) {
  
  if (jsObject.length == 0) return;

  let cssAstArr = [];
  jsObject.forEach(item => {
    cssAstArr.push(createAstItem(item))
    if (item.children.length > 0) {
      // 嵌套类名（为 css to less 做准备）
      item.children.map(jtem => {
        jtem.className = `${item.className} ${jtem.className}`
      })
      let transition = createAstFor(item.children)
      cssAstArr = [...cssAstArr, ...transition]
    }
  })

  return cssAstArr
}

// 生成AST语法树基本对象结构
function createAstItem(data) {
  
  let attributeArr = []
  for (let key in data.attribute) {
    attributeArr.push(astItemAttribute(key, data.attribute[key]))
  }
  // console.log(`.${data.className} 属性信息：`, attributeArr);

  return {
    type: 'Rule',
    loc: null,
    prelude: {
      type: 'SelectorList',
      loc: null,
      children: [
        {
          type: 'Selector',
          loc: null,
          children: [
            {
              type: 'TypeSelector',
              loc: null,
              name: data.className
            }
          ]
        }
      ]
    },
    block: {
      type: 'Block',
      loc: null,
      children: attributeArr
    }
  }
}

// 生成AST基本对象属性
function astItemAttribute(property, value) {
  return {
    type: 'Declaration',
    loc: null,
    important: false,
    property: property,
    value: {
      type: 'Value',
      loc: null,
      children: [
        {
          type: 'Identifier',
          loc: null,
          name: value
        }
      ]
    }
  }
}

module.exports = init