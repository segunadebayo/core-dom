type Root = Document | Element | null

export function queryElements<T extends HTMLElement>(root: Root, selector: string) {
  return Array.from(root?.querySelectorAll<T>(selector) ?? [])
}

export function itemById<T extends HTMLElement>(v: T[], id: string) {
  return v.find((node) => node.id === id)
}

export function indexOfId<T extends HTMLElement>(v: T[], id: string) {
  const item = itemById(v, id)
  return item ? v.indexOf(item) : -1
}

export function nextById<T extends HTMLElement>(v: T[], id: string, loop?: boolean) {
  let idx = indexOfId(v, id)
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1)
  return v[idx]
}

export function prevById<T extends HTMLElement>(v: T[], id: string, loop?: boolean) {
  let idx = indexOfId(v, id)
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1)
  return v[idx]
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

export function sortByTreeOrder<T extends HTMLElement>(v: T[]) {
  return v.sort((a, b) => (a.compareDocumentPosition(b) & 2 ? 1 : -1))
}
