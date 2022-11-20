// Local imports
import { STATE } from './State.js'





export function generateCard() {
	let loopCount = 0
	let newCard = STATE.currentCard

	while ((newCard === STATE.currentCard) && loopCount < 100) {
		newCard = Math.ceil(Math.random() * 10)
		loopCount += 1
	}

	return newCard
}
