// Local imports
import { STATE } from './State.js'





export function calculateScore() {
	const baseScore = 10
	const roundScore = baseScore * (STATE.round + 1)

	const cardDiff = 10 - Math.abs(STATE.currentCard - STATE.previousCard)
	const scoreMultiplier = 1 + (0.1 * cardDiff)

	return Math.floor(roundScore * scoreMultiplier)
}
