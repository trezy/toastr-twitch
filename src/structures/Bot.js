// Module imports
import {
	ChatClient,
	LogLevel,
} from '@twurple/chat'
import { RefreshingAuthProvider } from '@twurple/auth'





// Local imports
import { commands } from '../commands/index.js'





// Constants
const {
	TWITCH_ACCESS_TOKEN,
	TWITCH_CHANNEL,
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
	TWITCH_REFRESH_TOKEN,
} = process.env





class BotClass{
	twitchAuthProvider = null
	twitchChatClient = null

	constructor() {
		this.twitchAuthProvider = new RefreshingAuthProvider(
			{
				clientId: TWITCH_CLIENT_ID,
				clientSecret: TWITCH_CLIENT_SECRET,
			},
			{
				accessToken: TWITCH_ACCESS_TOKEN,
				refreshToken: TWITCH_REFRESH_TOKEN,
			},
		)

		this.twitchChatClient = new ChatClient({
			logger: { minLevel: LogLevel.DEBUG },
			authProvider: this.twitchAuthProvider,
		})
	}

	async handleCommandResult(options) {
		const {
			result,
			messageObject,
		} = options

		if (!result) {
			return
		}

		if (typeof result === 'string') {
			return this.twitchChatClient.say(TWITCH_CHANNEL, result)
		}

		const responseOptions = {}

		if (result.isReply) {
			responseOptions.replyTo = messageObject
		}

		return this.twitchChatClient.say(TWITCH_CHANNEL, result.content, responseOptions)
	}

	async handleMessage(...args) {
		const [
			/* channel */,
			/* username */,
			/* message */,
			messageObject,
		] = args

		if (!messageObject.content.value.startsWith('!')) {
			return
		}

		const [
			commandName,
			...commandArgs
		] = messageObject.content.value
			.replace(/^!/, '')
			.replace(/\s+/, ' ')
			.split(' ')
		const command = commands[commandName.toLowerCase()]

		if (command) {
			const result = await command({
				commandArgs,
				messageObject,
			})

			this.handleCommandResult({
				result,
				messageObject,
			})
		}
	}

	async start() {
		this.twitchChatClient.onMessage((...args) => this.handleMessage(...args))

		await this.twitchChatClient.connect()

		await this.twitchChatClient.onRegister(async() => {
			await this.twitchChatClient.join(TWITCH_CHANNEL)
		})
	}
}

export const Bot = new BotClass
