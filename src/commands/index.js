// Local imports
import { botUptime } from './bot-uptime.js'
import { currency } from './currency.js'
import { eightBall } from './8ball.js'
import { fortune } from './fortune.js'
import { ping } from './ping.js'





export const commands = Object
	.entries({
		'8ball': eightBall,
		'8-ball': eightBall,
		botUptime,
		'bot-uptime': botUptime,
		currency,
		eightBall,
		fortune,
		ping,
	})
	.reduce((accumulator, [key, value]) => {
		accumulator[key.toLowerCase()] = value
		return accumulator
	}, {})
