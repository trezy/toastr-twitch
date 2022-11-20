// Local imports
import { Bot } from '../../structures/Bot.js'
import { handleMessage } from './handleMessage.js'
import { Participant } from './Participant.js'
import { STATE } from './State.js'





export function endGame(options) {
	const {
		participants,
		result,
	} = options

	Bot.off('message', handleMessage)

	let response = `The new card is ${STATE.currentCard}, which is ${result}!  All players have been eliminated.`

	if (STATE.round > 0) {
		if (participants.length === 1) {
			response += ` ${participants[0].displayName} wins`
		} else if (participants.length > 1) {
			const participantsString = commaSeparateArray(participants.map(winner => winner.displayName))

			response += ` ${participantsString} all win`
		}

		response += ` with a streak of ${STATE.round}!`
	}

	response += ' Start a new game with the command !higher-lower.'

	Participant.clearCollection()
	STATE.reset()

	Bot.say({
		result: {
			content: response,
		},
	})
}
