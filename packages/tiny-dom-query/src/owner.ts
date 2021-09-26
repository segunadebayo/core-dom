export function getOwner(el: HTMLElement) {
  return {
    doc: el?.ownerDocument ?? document,
    win: el?.ownerDocument.defaultView ?? window,
    root: el?.getRootNode(),
  }
}
