// Local imports
import { Bot } from '../../structures/Bot.js'
import { endRound } from './endRound.js'
import { generateCard } from './generateCard.js'
import { STATE } from './State.js'





// Constants
import {
	ROUND_TIME_LIMIT,
	ROUND_TIME_LIMIT_STRING,
} from './Constants.js'





export function startGame(options) {
	const { messageObject } = options

	STATE.currentCard = generateCard()
	STATE.isActive = true

	Bot.say({
		messageObject,
		result: {
			content: `Starting a new game of higher or lower! The first card is ${STATE.currentCard}. Will the next card be higher or lower? You have ${ROUND_TIME_LIMIT_STRING} to decide!`,
			isReply: true,
		},
	})

	setTimeout(endRound, ROUND_TIME_LIMIT)
}
