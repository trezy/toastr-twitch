// Module imports
import fetch from 'node-fetch'





// Local imports
import { logger } from '../helpers/logger.js'





export const name = '8ball'

export const aliases = ['8-ball']

/**
 * Responds to a query with an answer from the magic 8-ball.
 *
 * @returns {object} The response object.
 */
export async function handler(options) {
	const { commandArgs } = options

	if (!commandArgs?.length) {
		return {
			content: '🔮 The Magic 8-ball requires a query, which you did not provide.',
			isReply: true,
		}
	}

	const magicResponse = await fetch(`https://8ball.delegator.com/magic/JSON/${commandArgs.join(' ')}`)
	const { magic } = await magicResponse.json()

	let emoji = null

	switch (magic.type) {
		case 'Affirmative':
			emoji = '😁'
			break

		case 'Contrary':
			emoji = '😬'
			break

		case 'Neutral':
			emoji = '🤔'
			break

		default:
			logger.error('Received an unrecognised response type.')
	}

	return {
		content: `🔮 The Magic 8-ball says... ${magic.answer}. ${emoji}`,
		isReply: true,
	}
}
