// Local imports
import {
	HIGHER,
	LOWER,
} from './Constants.js'
import { Bot } from '../../structures/Bot.js'
import { Participant } from './Participant.js'
import { STATE } from './State.js'





export function handleMessage(options) {
	if (!STATE.isActive) {
		return
	}

	const {
		commandArgs,
		messageObject,
	} = options

	const messageString = commandArgs
		.join(' ')
		.toLowerCase()
		.trim()

	if ([HIGHER, LOWER].includes(messageString)) {
		let participant = Participant.get(messageObject.userInfo.userId)

		if (!participant) {
			if (STATE.round !== 0) {
				Bot.say({
					messageObject,
					result: {
						content: 'Sorry, either the game has already started, or you\'ve already been eliminated.',
						isReply: true,
					},
				})

				return null
			}

			participant = new Participant(messageObject.userInfo)
		}

		participant.setGuess(messageString)
	}
}
