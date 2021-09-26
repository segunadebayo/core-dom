const t = (v: any) => Object.prototype.toString.call(v).slice(8, -1)
const isObj = (v: any): v is Record<string, any> => t(v) === "Object"

export function isHTMLElement(v: any): v is HTMLElement {
  return isObj(v) && v.nodeType === 1 && t(v.nodeName) === "String"
}
