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

export const t = (v: any) => Object.prototype.toString.call(v).slice(8, -1)

export const isRef = (v: any): v is RefTarget => {
  return t(v) === "Object" && "current" in v
}

export const runIfFn = (fn: any): HTMLElement | null => {
  return t(fn) === "Function" ? fn() : fn
}

export const isTouchEvent = (v: Event): v is TouchEvent => {
  return t(v) === "Object" && !!(v as TouchEvent).touches
}

const fallback = { pageX: 0, pageY: 0, clientX: 0, clientY: 0 }
export function extractInfo<T extends AnyPointerEvent = AnyPointerEvent>(event: T, type: "page" | "client" = "page") {
  const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] || fallback : event
  return {
    point: {
      x: point[`${type}X`],
      y: point[`${type}Y`],
    },
  }
}
