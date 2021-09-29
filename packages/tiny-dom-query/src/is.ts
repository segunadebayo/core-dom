const t = (v: any) => Object.prototype.toString.call(v).slice(8, -1)

export const isHTMLElement = (v: any): v is HTMLElement =>
  v != null && /(HTML|SVG)\w+Element/.test(t(v)) && v.nodeType === Node.ELEMENT_NODE
