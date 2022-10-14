// Local imports
import { botUptime } from './bot-uptime.js'
import { currency } from './currency.js'
import { discord } from './discord.js'
import { eightBall } from './8ball.js'
import { fortune } from './fortune.js'
import { instagram } from './instagram.js'
import { ping } from './ping.js'
import { tiktok } from './tiktok.js'
import { twitter } from './twitter.js'
import { youtube } from './youtube.js'





export const commands = Object
	.entries({
		'8ball': eightBall,
		'8-ball': eightBall,
		botUptime,
		'bot-uptime': botUptime,
		currency,
		discord,
		eightBall,
		fortune,
		instagram	,
		ping,
		tiktok,
		twitter,
		youtube,
	})
	.reduce((accumulator, [key, value]) => {
		accumulator[key.toLowerCase()] = value
		return accumulator
	}, {})
