import { preventScrollPolyfill, supportsPreventScroll } from "./polyfill"

export type FocusOptions = {
  select?: boolean
  preventScroll?: boolean
}

type FocusableElement = {
  focus(options: { preventScroll: boolean }): void
  focus(): void
}

export function focus(el: FocusableElement, options: FocusOptions = {}) {
  const { preventScroll = true, select } = options

  if (isDisabled(el) || t(el.focus) !== "Function") {
    return
  }

  if (supportsPreventScroll()) {
    el.focus({ preventScroll })
  } else {
    el.focus()
    if (isElement(el)) preventScrollPolyfill(el)
  }

  if (isSelectable(el) && select) {
    el.select()
  }
}

export const t = (v: any) => Object.prototype.toString.call(v).slice(8, -1)

const isElement = (v: any): v is HTMLElement =>
  t(v) === "Object" && v.nodeType === Node.ELEMENT_NODE && t(v.nodeName) === "String"

function isDisabled(el: unknown) {
  if (!isElement(el)) return true
  return !!el.getAttribute("disabled") || !!el.getAttribute("aria-disabled")
}

function isSelectable(el: unknown): el is { select(): void } {
  return isElement(el) && "select" in el
}
