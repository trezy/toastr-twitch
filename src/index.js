// Module imports
import 'dotenv/config'





// Local imports
import { API } from './structures/API.js'
import { Bot } from './structures/Bot.js'





const isDisabled = Number(process.env.IS_DISABLED)

if (!isDisabled) {
	// Start the bot
	Bot.start()

	// Start the web server
	API.start()
}
