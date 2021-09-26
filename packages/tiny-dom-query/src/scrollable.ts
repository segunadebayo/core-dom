import { getOwner } from "./owner"
import { getParent } from "./parent"
import { getStyle } from "./style"
import { isHTMLElement } from "./is"

export function isScrollable(el: HTMLElement | null): boolean {
  if (!el) return false
  const hasScrollableContent = el.scrollHeight > el.offsetHeight || el.scrollWidth > el.offsetWidth
  const { overflow, overflowX, overflowY } = getStyle(el).value
  const hasOverflowStyle = /auto|scroll|overlay/.test(overflow + overflowY + overflowX)
  return hasOverflowStyle && hasScrollableContent
}

export function getScrollParents(el: HTMLElement | null | undefined): HTMLElement[] {
  const result: HTMLElement[] = []
  if (!el) return result

  const { doc } = getOwner(el)
  if (["html", "body", "#document"].indexOf(el.localName) >= 0) return [doc.body]

  if (isHTMLElement(el) && isScrollable(el)) result.push(el)
  const parentEl = getParent(el)
  return result.concat(getScrollParents(parentEl))
}

export function getScrollParent(el: HTMLElement | null | undefined): HTMLElement | undefined {
  return getScrollParents(el)[0]
}

export function getScrollOffset(el: HTMLElement | null | undefined) {
  const parent = getScrollParent(el)
  if (parent) return { top: parent.scrollTop, left: parent.scrollLeft }

  const env = el ? getOwner(el) : null
  if (env) return { top: env.win.scrollY, left: env.win.scrollX }

  return { top: 0, left: 0 }
}
