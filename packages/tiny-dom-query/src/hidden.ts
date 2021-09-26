import { getStyle } from "./style"

export function isHidden(el: HTMLElement | null, until?: HTMLElement) {
  const style = getStyle(el)
  if (!el || style.is("visibility", "hidden")) return true
  while (el) {
    if (until != null && el === until) return false
    if (style.is("display", "none")) return true
    el = el.parentElement
  }
  return false
}
