// Module imports
import {
	ChatClient,
	LogLevel,
} from '@twurple/chat'
import { RefreshingAuthProvider } from '@twurple/auth'





// Constants
const {
	TWITCH_ACCESS_TOKEN,
	TWITCH_CHANNEL,
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
	TWITCH_REFRESH_TOKEN,
} = process.env





export class Bot{
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

	async initialise() {
		this.twitchChatClient.onMessage(async (...args) => {
			const [
				/* channel */,
				/* username */,
				/* message */,
				messageObject,
			] = args

			console.log(messageObject)
		})

		await this.twitchChatClient.connect()

		await this.twitchChatClient.onRegister(async() => {
			await this.twitchChatClient.join(TWITCH_CHANNEL)
		})
	}
}
