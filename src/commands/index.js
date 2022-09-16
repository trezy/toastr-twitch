// Local imports
import { ping } from './ping.js'





export const commands = [
	ping,
].reduce((accumulator, command) => {
	accumulator[command.name.toLowerCase()] = command
	return accumulator
}, {})
