import { addDomEvent } from "./dom"
import { getEventName } from "./event-name"
import { AnyPointerEvent, DOMEventTarget, EventMap, extractInfo, PointerEventInfo } from "./utils"

export function addPointerEvent<K extends keyof EventMap>(
  target: DOMEventTarget,
  event: K,
  listener: (event: EventMap[K], info: PointerEventInfo) => void,
  options?: EventListenerOptions,
) {
  return addDomEvent(target, getEventName(event), wrapHandler(listener, event === "pointerdown"), options)
}

function wrapHandler<E extends EventMap[keyof EventMap]>(
  fn: (event: E, info: PointerEventInfo) => void,
  filter = false,
) {
  const listener: EventListener = (event: any) => {
    fn(event, extractInfo(event))
  }
  return filter ? filterPrimaryPointer(listener) : listener
}

function filterPrimaryPointer(fn: EventListener): EventListener {
  return (event: Event) => {
    const win = ((event as UIEvent).view ?? window) as typeof window
    const isMouseEvent = event instanceof win.MouseEvent
    const isPrimary = !isMouseEvent || (isMouseEvent && event.button === 0)
    if (isPrimary) {
      fn(event)
    }
  }
}

export function extractClientInfo(event: AnyPointerEvent) {
  return extractInfo(event, "client")
}
