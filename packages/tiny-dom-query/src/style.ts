type Key = keyof CSSStyleDeclaration | (string & {})
type Styles = Record<Key, any>
const cache: WeakMap<HTMLElement, Styles> = new WeakMap()
type El = HTMLElement | null | undefined

export function getStyle(el: El): StylesReturn {
  if (!el) return empty

  let style: Styles | undefined = cache.get(el)

  if (!style) {
    const win = el?.ownerDocument.defaultView ?? window
    style = win.getComputedStyle(el) as Styles
    cache.set(el, style)
  }

  return {
    value: style,
    get: (v) => style?.getPropertyValue(v as string),
    set: (o) => {
      Object.assign(el.style, o)
    },
    is: (k, v) => {
      const val = Array.isArray(v) ? v : [v]
      const vv = style?.getPropertyValue(k as string)
      return vv && val.includes(vv)
    },
  }
}

type StylesReturn = {
  value: Styles
  get: (v: Key) => string | undefined
  set: (o: Styles) => void
  is: <K extends Key>(k: K, v: string | string[]) => boolean
}

const empty: StylesReturn = {
  value: {} as Styles,
  get: (v: Key) => undefined,
  set: (o: Styles) => {},
  is: () => false,
}
