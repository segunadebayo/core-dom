export function className(el: HTMLElement | null) {
  return {
    add: (...cls: string[]) => {
      if (!el) return
      for (const v of cls) el.classList.add(v)
    },
    del: (...cls: string[]) => {
      if (!el) return
      for (const v of cls) el.classList.remove(v)
    },
    has: (v: string) => el?.classList.contains(v),
  }
}
