// Local imports
import { Bot } from '../structures/Bot.js'
import { handleCommand } from './higher-lower/handleCommand.js'
import { handleMessage } from './higher-lower/handleMessage.js'





export const name = 'higher-lower'

export const aliases = ['higherlower']

export const handler = options => {
	Bot.on('message', handleMessage)

	handleCommand(options)

	return null
}
