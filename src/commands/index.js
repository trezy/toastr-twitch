// Local imports
import { eightBall } from './8ball.js'
import { fortune } from './fortune.js'
import { ping } from './ping.js'





export const commands = Object
	.entries({
		'8ball': eightBall,
		fortune,
		ping,
	})
	.reduce((accumulator, [key, value]) => {
		accumulator[key.toLowerCase()] = value
		return accumulator
	}, {})
