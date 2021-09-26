export type EventMap = DocumentEventMap | WindowEventMap | HTMLElementEventMap

export type DOMTarget = Document | HTMLElement | EventTarget | null

export type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent

export type RefTarget = { current: HTMLElement | null }

export type DOMEventTarget = (() => DOMTarget) | DOMTarget | RefTarget

export type EventListenerOptions = boolean | AddEventListenerOptions

export interface PointerEventInfo {
  point: { x: number; y: number }
}

export type EventListenerWithPointInfo<T extends AnyPointerEvent = AnyPointerEvent> = (
  event: T,
  info: PointerEventInfo,
) => void

export const isRef = (v: any): v is RefTarget => {
  return v && typeof v === "object" && "current" in v
}

export const runIfFn = (fn: any): HTMLElement | null => {
  return typeof fn === "function" ? fn() : fn
}

export const isTouchEvent = (v: Event): v is TouchEvent => {
  return typeof v === "object" && !!(v as TouchEvent).touches
}

export function extractInfo<T extends AnyPointerEvent = AnyPointerEvent>(event: T, type: "page" | "client" = "page") {
  const fallback = { [`${type}X`]: 0, [`${type}Y`]: 0 }
  const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] || fallback : event
  return {
    point: {
      x: point[`${type}X`],
      y: point[`${type}Y`],
    },
  }
}
