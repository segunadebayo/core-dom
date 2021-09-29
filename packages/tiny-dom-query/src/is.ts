const isObj = (v: unknown): v is Record<string, any> => !(v == null || typeof v !== "object" || Array.isArray(v))

export const isHTMLElement = (v: any): v is HTMLElement =>
  isObj(v) && v.nodeType === Node.ELEMENT_NODE && typeof v.nodeName === "string"
