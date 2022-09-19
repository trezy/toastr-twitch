// Local imports
import { getRandomFortune } from '../helpers/database.js'





/**
 * Returns a random fortune from a fortune cookie.
 *
 * @returns {object} The response object.
 */
export async function fortune() {
	const { data: fortune } = await getRandomFortune()

	return {
		content: `"${fortune.body}" Lucky numbers: ${fortune.luckyNumbers.join(', ')}. Originally opened ${fortune.originallyOpened || 'before 04 March, 2022'}`,
		isReply: true,
	}
}
