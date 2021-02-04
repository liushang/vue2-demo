const DRAWING_ITEMS = 'drawingItems'
const DRAWING_ITEMS_VERSION = '1.2'
const DRAWING_ITEMS_VERSION_KEY = 'DRAWING_ITEMS_VERSION'
const DRAWING_ID = 'idGlobal'
const TREE_NODE_ID = 'treeNodeId'
const FORM_CONF = 'formConf'

export function getDrawingList() {
  // 加入缓存版本的概念，保证缓存数据与程序匹配
  const version = localStorage.getItem(DRAWING_ITEMS_VERSION_KEY)
  if (version !== DRAWING_ITEMS_VERSION) {
    localStorage.setItem(DRAWING_ITEMS_VERSION_KEY, DRAWING_ITEMS_VERSION)
    saveDrawingList([])
    return null
  }

  const str = localStorage.getItem(DRAWING_ITEMS)
  if (str) return propertyStringToFunc(JSON.parse(str))
  return null
}

export function propertyStringToFunc(str) {
  for(let i of str) {
    if (i.props && (i.props.renderFunStr)) {
      let funStr = i.props.renderFunStr || i.props.renderFun
      // 获取函数体
      let funLast = funStr.slice(funStr.indexOf('{') + 1)
      let funMiddle = funLast.slice(0, funLast.lastIndexOf('}'))
      // 获取函数参数
      let funPre = funStr.slice(funStr.indexOf('(') + 1)
      let funNamePre = funPre.slice(0, funPre.indexOf(')'))
      let funNameArr = funNamePre.split(',')
      i.props.renderFunStr = i.props.renderFun
      i.props.renderFun = new Function(...funNameArr, funMiddle);
    }
    if (i.children) {
      for (let y of i.children) {
        propertyStringToFunc(y)
      }
    }
  }
  return str
}

export function stringToFunc(str) {
  let funStr = str
  // 获取函数体
  let funLast = funStr.slice(funStr.indexOf('{') + 1)
  let funMiddle = funLast.slice(0, funLast.lastIndexOf('}'))
  // 获取函数参数
  let funPre = funStr.slice(funStr.indexOf('(') + 1)
  let funNamePre = funPre.slice(0, funPre.indexOf(')'))
  let funNameArr = funNamePre.split(',')
  return new Function(...funNameArr, funMiddle);
}

export function saveDrawingList(list) {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list))
}

export function getIdGlobal() {
  const str = localStorage.getItem(DRAWING_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveIdGlobal(id) {
  localStorage.setItem(DRAWING_ID, `${id}`)
}

export function getTreeNodeId() {
  const str = localStorage.getItem(TREE_NODE_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveTreeNodeId(id) {
  localStorage.setItem(TREE_NODE_ID, `${id}`)
}

export function getFormConf() {
  const str = localStorage.getItem(FORM_CONF)
  if (str) return JSON.parse(str)
  return null
}

export function saveFormConf(obj) {
  localStorage.setItem(FORM_CONF, JSON.stringify(obj))
}
