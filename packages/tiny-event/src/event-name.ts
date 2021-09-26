import { EventMap } from "./utils"

interface PointerNameMap {
  pointerdown: string
  pointermove: string
  pointerup: string
  pointercancel: string
  pointerover?: string
  pointerout?: string
  pointerenter?: string
  pointerleave?: string
}

const mouseEventNames: PointerNameMap = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave",
}

const touchEventNames: PointerNameMap = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel",
}

const supportsPointerEvent = () => typeof window !== "undefined" && window.onpointerdown === null
const supportsTouchEvent = () => typeof window !== "undefined" && window.ontouchstart === null
const supportsMouseEvent = () => typeof window !== "undefined" && window.onmousedown === null

export function getEventName(evt: keyof EventMap): keyof EventMap {
  if (supportsPointerEvent()) return evt
  if (supportsTouchEvent()) return touchEventNames[evt]
  if (supportsMouseEvent()) return mouseEventNames[evt]
  return evt
}
