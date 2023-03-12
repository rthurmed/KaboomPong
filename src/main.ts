import kaboom from "kaboom"
import { makeBall } from "./ball"
import { makePad, PAD_TAG, PAD_OUTLINE, configurePad } from "./pad"

const WALL_SIZE = 50
const BACKWALL_TAG = "backwall"
const SIDEWALL_TAG = "sidewall"
const PAD_SPEED = 6
const BALL_SPEED_INITIAL = 6
const BALL_SPEED_INCREASE = 1

const kaboomInstance = kaboom({
  width: 800,
  height: 600
})

// debug.inspect = true
// camScale(vec2(.5, .5))

const background = add([
  rect(width(), height()),
  color(57, 133, 90)
])

// BORDERS
const wallProperties = [
  opacity(0),
  area(),
  solid()
]
const walls = [
  add([
    pos(0, -WALL_SIZE),
    rect(width(), WALL_SIZE),
    SIDEWALL_TAG,
    ...wallProperties
  ]),
  add([
    pos(0, height()),
    rect(width(), WALL_SIZE),
    SIDEWALL_TAG,
    ...wallProperties
  ]),
  add([
    pos(-WALL_SIZE, -WALL_SIZE),
    rect(WALL_SIZE, height() + WALL_SIZE * 2),
    BACKWALL_TAG,
    ...wallProperties
  ]),
  add([
    pos(width(), -WALL_SIZE),
    rect(WALL_SIZE, height() + WALL_SIZE * 2),
    BACKWALL_TAG,
    ...wallProperties
  ])
]

// ELEMENTS
// PADS
const score = {
  left: 0,
  right: 0
}

const padLeft = add(makePad())
const padRight = add(makePad({ right: true }))

configurePad(padLeft, { up: "w", down: "s", speed: PAD_SPEED })
configurePad(padRight, { up: "i", down: "k", speed: PAD_SPEED })

// BALL
const ball = add(makeBall({ defaultSpeed: BALL_SPEED_INITIAL }))
ball.reset()

onUpdate(() => {
  ball.pos = ball.pos.add(ball.direction.scale(ball.speed))
})

ball.onCollide(PAD_TAG, () => {
  ball.direction = ball.direction.scale(vec2(-1, 1))
  ball.speed += BALL_SPEED_INCREASE
  kaboomInstance.addKaboom(ball.pos)
})

ball.onCollide(SIDEWALL_TAG, () => {
  ball.direction = ball.direction.scale(vec2(1, -1))
})

ball.onCollide(BACKWALL_TAG, () => {
  if (ball.direction.y < 0) {
    score.right += 1
  } else {
    score.left += 1
  }
  burp()
  ball.reset()
})