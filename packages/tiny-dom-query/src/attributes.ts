export function attrs(el: HTMLElement | null) {
  return {
    has: (v: string) => el?.hasAttribute(v),
    get: (v: string) => el?.getAttribute(v),
    set: (o: Record<string, any>) => {
      for (const k in o) {
        el?.setAttribute(k, o[k])
      }
    },
  }
}
