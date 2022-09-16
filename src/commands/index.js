// Local imports
import { eightBall } from './8ball.js'
import { ping } from './ping.js'





export const commands = Object
	.entries({
		'8ball': eightBall,
		ping,
	})
	.reduce((accumulator, [key, value]) => {
		accumulator[key.toLowerCase()] = value
		return accumulator
	}, {})
