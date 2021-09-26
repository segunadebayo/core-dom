import { isHTMLElement } from "./is"
import { isDisabled } from "./disabled"
import { focusableSelector } from "./focusable-selector"
import { isHidden } from "./hidden"

/**
 * Returns the focusable elements within the element
 */
export const getFocusables = (el: HTMLElement | null, includeContainer = false) => {
  if (!el) return []
  let els = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector))
  if (includeContainer) els.unshift(el)
  return els.filter((el) => isFocusable(el) && !isHidden(el))
}

/**
 * Whether this element is focusable
 */
export const isFocusable = (el: HTMLElement | null) => {
  if (!isHTMLElement(el) || isHidden(el) || isDisabled(el)) return false
  return el?.matches(focusableSelector)
}
