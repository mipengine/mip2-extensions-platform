export const isInViewport = (
  el,
  { partial = true, thresholdX = 0, thresholdY = 0 } = {}
) => {
  const {
    top,
    left,
    width: elWidth,
    height: elHeight
  } = MIP.util.rect.getElementOffset(el)
  const bottom = top + elHeight
  const right = left + elWidth
  const { height, width } = MIP.viewport.getRect()

  const viewPortTop = 0 - thresholdY
  const viewPortBottom = height + thresholdY
  const viewPortLeft = 0 - thresholdX
  const viewPortRight = width + thresholdX
  return partial
    ? ((top > viewPortTop && top < viewPortBottom) ||
        (bottom > viewPortTop && bottom < viewPortBottom)) &&
        ((left > viewPortLeft && left < viewPortRight) ||
          (right > viewPortLeft && right < viewPortRight) ||
          left === viewPortLeft ||
          right === viewPortRight)
    : top >= viewPortTop &&
        left >= viewPortLeft &&
        bottom <= viewPortBottom &&
        right <= viewPortRight
}
