export function getJSONNode (config) {
  let jNodeObj = {}
  return (jNodeName) => {
    if (config.jNode === jNodeName) {
      if (jNodeObj[jNodeName]) {
        if (typeof jNodeObj[jNodeName] === 'Array') {
          jNodeObj[jNodeName] = [ ...jNodeObj[jNodeName], config ]
        } else {
          jNodeObj[jNodeName] = [ config ]
        }
      } else {
        jNodeObj[jNodeName] = config
      }
    } else {
      if (config.children) {
        const childrenNode = config.children;
        for (let i of childrenNode) {
          getRefNode(i, jNodeName)
        }
      }
    }
  }
}