import { isDisabled } from "./disabled"
import { getFocusables, isFocusable } from "./focusable"
import { isHidden } from "./hidden"

/**
 * Returns the tabbable elements within the element
 */
export const getTabbables = (el: HTMLElement, includeContainer = false) => {
  return getFocusables(el, includeContainer).filter(isTabbable)
}

/**
 * Whether this element is tabbable
 */
export const isTabbable = (el: HTMLElement | null) => {
  return isFocusable(el) && !isDisabled(el) && !isHidden(el)
}
