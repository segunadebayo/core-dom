import { attrs } from "./attributes"

export const isDisabled = (el: HTMLElement | null): boolean => {
  const v = attrs(el)
  return v.get("disabled") != null || !!v.get("aria-disabled") === true
}
