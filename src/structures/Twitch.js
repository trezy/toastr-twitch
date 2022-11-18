// Module imports
import {
	ChatClient,
	LogLevel,
} from '@twurple/chat'
import { ApiClient } from '@twurple/api'
import { RefreshingAuthProvider } from '@twurple/auth'





// Constants
const {
	TWITCH_ACCESS_TOKEN,
	TWITCH_CHANNEL,
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
	TWITCH_REFRESH_TOKEN,
} = process.env

export const authProvider = new RefreshingAuthProvider(
	{
		clientId: TWITCH_CLIENT_ID,
		clientSecret: TWITCH_CLIENT_SECRET,
	},
	{
		accessToken: TWITCH_ACCESS_TOKEN,
		refreshToken: TWITCH_REFRESH_TOKEN,
	},
)

export const apiClient = new ApiClient({ authProvider })
export const chatClient = new ChatClient({
	logger: { minLevel: LogLevel.DEBUG },
	authProvider,
})
