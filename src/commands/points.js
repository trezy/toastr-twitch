// Local imports
import * as db from '../helpers/db.js'





export const name = 'points'

export async function handler(options) {
	const { messageObject } = options

	const user = await db.findOrCreateUser(messageObject.userInfo.userId)

	return {
		content: `You currently have ${user?.points ?? 0} points.`,
		isReply: true,
	}
}
