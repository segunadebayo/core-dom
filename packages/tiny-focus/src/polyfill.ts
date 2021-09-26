let supportCache: boolean | null = null

export function supportsPreventScroll() {
  if (supportCache == null) {
    supportCache = false
    try {
      const div = document.createElement("div")
      div.focus({
        get preventScroll() {
          supportCache = true
          return true
        },
      })
    } catch (e) {
      // Ignore
    }
  }

  return supportCache
}

interface ScrollableElement {
  element: HTMLElement
  scrollTop: number
  scrollLeft: number
}

function getScrollableElements(element: HTMLElement): ScrollableElement[] {
  const doc = element.ownerDocument
  const win = doc.defaultView ?? window

  let parent = element.parentNode
  const scrollableElements: ScrollableElement[] = []
  const rootScrollingElement = doc.scrollingElement || doc.documentElement

  while (parent instanceof win.HTMLElement && parent !== rootScrollingElement) {
    if (
      parent.offsetHeight < parent.scrollHeight ||
      parent.offsetWidth < parent.scrollWidth
    ) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      })
    }
    parent = parent.parentNode
  }

  if (rootScrollingElement instanceof win.HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    })
  }

  return scrollableElements
}

export function preventScrollPolyfill(el: HTMLElement) {
  const scrollableElements = getScrollableElements(el)
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop
    element.scrollLeft = scrollLeft
  }
}
