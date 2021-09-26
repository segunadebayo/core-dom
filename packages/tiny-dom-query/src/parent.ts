import { getOwner } from "./owner"

export function getParent(el: HTMLElement): HTMLElement {
  const { doc } = getOwner(el)
  if (el.localName === "html") return el
  return el.assignedSlot || el.parentElement || doc.documentElement
}
