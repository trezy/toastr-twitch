// Local imports
import { Bot } from '../../structures/Bot.js'
import { startGame } from './startGame.js'
import { STATE } from './State.js'





export function handleCommand(options) {
	const { messageObject } = options

	if (STATE.isActive) {
		Bot.say({
			messageObject,
			result: {
				content: 'Sorry, there\'s already a game running! Please wait until it\'s finished to start a new one. ❤️',
				isReply: true,
			},
		})

		return null
	}

	startGame(options)
}
