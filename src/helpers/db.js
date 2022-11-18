// Module imports
import { PrismaClient } from '@prisma/client'





// Local imports
import * as Twitch from '../structures/Twitch.js'





// Constants
const { TWITCH_USER_ID } = process.env
const prisma = new PrismaClient()





export async function addPoints(userID, points) {
	const user = await findOrCreateUser(userID)

	await prisma.user.update({
		data: {
			points: user.points + points,
		},
		where: {
			id: userID,
		},
	})
}

export function findUser(userID) {
	return prisma.user.findUnique({
		where: {
			id: userID,
		},
	})
}

export async function findOrCreateUser(userID, initialPoints = 0) {
	let user = await findUser(userID)

	if (!user) {
		const followData = await Twitch.apiClient.users.getFollowFromUserToBroadcaster(userID, TWITCH_USER_ID)
		const isFollower = Boolean(followData)

		user = await prisma.user.create({
			data: {
				id: userID,
				points: initialPoints + (isFollower ? 200 : 0),
			},
		})
	}

	return user
}
