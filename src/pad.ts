import { Key, GameObj } from "kaboom/dist/kaboom"

export const PAD_WIDTH = 12
export const PAD_HEIGHT = 120
export const PAD_OUTLINE = 4
export const PAD_TAG = "pad"

export const makePad = ({ right = false } = {}) => ([
  pos(center().add(((width() / 2) - PAD_WIDTH) * (right ? 1 : -1), 0)),
  rect(PAD_WIDTH, PAD_HEIGHT),
  outline(PAD_OUTLINE),
  area(),
  body({
    weight: 0
  }),
  origin(right ? "right" : "left"),
  PAD_TAG
])

interface ConfigurePadConfig {
  up: Key
  down: Key
  speed: number
}

export const configurePad = (pad: GameObj, config: ConfigurePadConfig) => {
  onKeyDown(config.up, () => {
    pad.pos.y -= config.speed
  })
  onKeyDown(config.down, () => {
    pad.pos.y += config.speed
  })
}
