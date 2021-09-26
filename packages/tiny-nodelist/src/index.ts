type Root = Document | Element | null

export function querySelectorAll<T extends HTMLElement>(root: Root, selector: string) {
  return Array.from(root?.querySelectorAll<T>(selector) ?? [])
}

export function itemById<T extends HTMLElement>(v: T[], id: string) {
  return v.find((node) => node.id === id)
}

export function indexOfId<T extends HTMLElement>(v: T[], id: string) {
  const item = itemById(v, id)
  return item ? v.indexOf(item) : -1
}

export function findByText<T extends HTMLElement>(v: T[], text: string, currentId?: string | null) {
  const fn = (item: T) => {
    const str = item.dataset.valuetext ?? item.textContent
    return !!str?.toLowerCase().startsWith(text.toLowerCase())
  }

  const matched = v.find(fn)
  const filtered = v.filter(fn)

  if (matched && matched.id === currentId && filtered.length > 1) {
    const index = filtered.indexOf(matched)
    const idx = (index + 1) % filtered.length
    return filtered[idx]
  }

  return matched
}

/**
 * Sort an array of DOM nodes according to the HTML tree order
 * @see https://dom.spec.whatwg.org/#trees
 */
export function sortByTreeOrder<T extends HTMLElement>(v: T[]) {
  return v.sort((a, b) => (a.compareDocumentPosition(b) & 2 ? 1 : -1))
}
