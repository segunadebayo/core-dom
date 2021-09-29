import { DOMEventTarget, EventMap, isRef, runIfFn } from "./utils"

export function addDomEvent<K extends keyof EventMap>(
  target: DOMEventTarget,
  event: K,
  listener: (event: EventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  const node = isRef(target) ? target.current : runIfFn(target)
  node?.addEventListener(event, listener, options)
  return () => node?.removeEventListener(event, listener, options)
}
