export const DIAMETER = 32
export const RADIUS = DIAMETER / 2
export const OUTLINE = 4
export const TAG = "ball"

export const makeBall = ({ defaultSpeed = 6 } = {}) => ([
  pos(center()),
  origin("center"),
  circle(RADIUS),
  outline(OUTLINE),
  area({
    height: DIAMETER,
    width: DIAMETER,
    shape: "circle"
  }),
  TAG,
  {
    speed: defaultSpeed,
    direction: vec2(),
    reset () {
      this.pos = center()
      const direction = rand() > .5 ? 1 : -1
      this.direction = vec2(rand(0.5, 1) * direction, rand(0.1, 1))
      this.speed = defaultSpeed
    }
  }
])