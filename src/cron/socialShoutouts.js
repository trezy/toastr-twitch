// Local imports
import { commands } from '../commands/index.js'





// Constants
const SOCIAL_COMMAND_ARRAY = [
	commands.discord,
	commands.instagram,
	commands.tiktok,
	commands.twitter,
	commands.youtube,
]





let command = SOCIAL_COMMAND_ARRAY[0]
let lastMessageCount = null

export default {
	runAt: '0 */5 * * * *',
	handler() {
		if ((lastMessageCount !== null) && (this.messageCounter < (lastMessageCount + 10))) {
			return
		}

		const result = command()
		this.handleCommandResult({ result })

		command = SOCIAL_COMMAND_ARRAY[SOCIAL_COMMAND_ARRAY.indexOf(command) + 1]

		if (!command) {
			command = SOCIAL_COMMAND_ARRAY[0]
		}

		lastMessageCount = this.messageCounter
	},
	onCompleteHandler() {},
}
