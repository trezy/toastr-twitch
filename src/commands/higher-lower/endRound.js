// Local imports
import {
	HIGHER,
	LOWER,
	ROUND_TIME_LIMIT,
	ROUND_TIME_LIMIT_STRING,
} from './Constants.js'
import { Bot } from '../../structures/Bot.js'
import { commaSeparateArray } from '../../helpers/commaSeparateArray.js'
import { generateCard } from './generateCard.js'
import { Participant } from './Participant.js'
import { STATE } from './State.js'
import { endGame } from './endGame.js'





export const endRound = () => {
	const newCard = generateCard()
	const losers = []
	const winners = []

	let result = LOWER

	if (newCard > STATE.currentCard) {
		result = HIGHER
	}

	STATE.currentCard = newCard

	const participants = Participant.getAll()

	participants.forEach(participant => {
		if (participant.currentGuess === result) {
			return winners.push(participant)
		}

		return losers.push(participant)
	})

	if (!winners.length) {
		return endGame({
			participants,
			result,
		})
	}

	let response = `The new card is ${newCard}, which is ${result}!`

	if (losers.length === 1) {
		response += ` ${losers[0].displayName} has been eliminated.`
	} else if (losers.length === 2) {
		response += ` ${losers[0].displayName} and ${losers[1].displayName} have been eliminated.`
	} else if (losers.length > 2) {
		const losersString = commaSeparateArray(losers.map(loser => loser.displayName))

		response += ` ${losersString} have been eliminated.`
	}

	losers.forEach(loser => loser.delete())
	winners.forEach(winner => winner.clearGuess())
	STATE.round += 1

	response += ` Will the next card be higher or lower? You have ${ROUND_TIME_LIMIT_STRING} to decide!`

	setTimeout(endRound, ROUND_TIME_LIMIT)

	Bot.say({
		result: {
			content: response,
		},
	})
}
