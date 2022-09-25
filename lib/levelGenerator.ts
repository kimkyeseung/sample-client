const getRandomAnswerIndex = (count: number): number =>
  ~~(Math.random() * count)

interface Level {
  time: number
  isSpeedUp: boolean
}

const timeLimter = (level: number): Level => {
  let isSpeedUp = false
  switch (level) {
    case 1:
      return { time: 5000, isSpeedUp }
    case 2:
      isSpeedUp = true
    case 3:
      return { time: 4000, isSpeedUp }
    case 4:
      isSpeedUp = true
    case 5:
    case 6:
      return { time: 3500, isSpeedUp }
    case 7:
      isSpeedUp = true
    case 8:
    case 9:
      return { time: 3000, isSpeedUp }
    case 10:
      isSpeedUp = true
    default:
      return { time: 2500, isSpeedUp }
  }
}

const optionCounter = (level: number): number => {
  switch (level) {
    case 1:
      return 4
    case 2:
      return 5
    case 3:
    case 4:
      return 6
    case 5:
    case 6:
      return 8
    case 7:
    case 8:
    case 9:
      return 9
    default:
      return 12
  }
}

const randomeAnswerGenerator = () => {
  const randomNumber = Math.random()

  return {
    answer: randomNumber.toString(36).substring(2),
    extra: randomNumber.toString(10).substring(2)
  }
}

export default function* levelGenerator() {
  let level = 1

  while (true) {
    const { time, isSpeedUp } = timeLimter(level)
    const optionCount = optionCounter(level)
    const answerIndex = getRandomAnswerIndex(optionCount)
    const { answer, extra } = randomeAnswerGenerator()
    const options = Array(optionCount).fill(extra)
    options[answerIndex] = answer
    yield {
      level,
      timeLimit: time,
      isSpeedUp,
      optionCount,
      answerIndex,
      options
    }
    level += 1
  }
}
