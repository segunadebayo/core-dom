import { isHTMLElement } from "./is"

type Node = HTMLElement | EventTarget | null

export const contains = (parent: Node | undefined, child: Node) => {
  if (!parent) return false
  return parent === child || (isHTMLElement(parent) && isHTMLElement(child) && parent.contains(child))
}
