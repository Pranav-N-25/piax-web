// Diagram geometry in viewBox units. Every layer is drawn flat (a top-down pad
// outline centred on 0,0) and then projected into the same isometric plane.
export const VIEW_WIDTH = 350
export const VIEW_HEIGHT = 510
export const CENTER_X = 165
const FIRST_LAYER_Y = 62
const LAYER_GAP = 56
export const LIFT = -12
export const SETTLE = 6
const ANGLE = -24
const SQUASH = 0.5
export const ISO = `scale(1 ${SQUASH}) rotate(${ANGLE})`
// Front tip of the flat outline, the anchor for connectors and pins.
const TIP_X = 150

export const layerY = (index) => FIRST_LAYER_Y + index * LAYER_GAP

// Where a layer's front tip lands in viewBox units — the point its connector arrow targets.
export function layerTip(index, lifted = false) {
  const radians = (ANGLE * Math.PI) / 180
  return {
    x: CENTER_X + TIP_X * Math.cos(radians) + 4,
    y: layerY(index) + TIP_X * Math.sin(radians) * SQUASH + (lifted ? LIFT : 0),
  }
}
