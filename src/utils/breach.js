import { HEX_CODES } from '../data/texts'

export const GRID_SIZE = 5
export const BUFFER_SIZE = 7
export const SEQUENCE_LENGTH = 4
export const TIME_LIMIT = 60

const randomItem = list => list[Math.floor(Math.random() * list.length)]

const randomCode = () => randomItem(HEX_CODES)

const lineIndexes = (horizontal, line) =>
  Array.from({ length: GRID_SIZE }, (_, position) =>
    horizontal ? line * GRID_SIZE + position : position * GRID_SIZE + line
  )

export function getAvailableCells(picks) {
  const horizontal = picks.length % 2 === 0

  if (picks.length === 0) {
    return lineIndexes(true, 0)
  }

  const last = picks[picks.length - 1]
  const line = horizontal ? Math.floor(last / GRID_SIZE) : last % GRID_SIZE

  return lineIndexes(horizontal, line).filter(index => !picks.includes(index))
}

export function createPuzzle() {
  const sequence = Array.from({ length: SEQUENCE_LENGTH }, randomCode)
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, randomCode)
  const path = []

  for (let step = 0; step < SEQUENCE_LENGTH; step += 1) {
    const index = randomItem(getAvailableCells(path))
    path.push(index)
  }

  path.forEach((index, step) => {
    cells[index] = sequence[step]
  })

  return { cells, sequence }
}

export function getProgress(buffer, sequence) {
  let best = 0

  for (let start = 0; start < buffer.length; start += 1) {
    let matched = 0

    while (
      start + matched < buffer.length &&
      matched < sequence.length &&
      buffer[start + matched] === sequence[matched]
    ) {
      matched += 1
    }

    const reachesEnd = start + matched === buffer.length
    const isComplete = matched === sequence.length

    if (reachesEnd || isComplete) {
      best = Math.max(best, matched)
    }
  }

  return best
}
