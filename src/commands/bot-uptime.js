export const name = 'botuptime'

export const aliases = ['bot-uptime']

/**
 * Responds with a basic message. Used to confirm bot is working properly.
 *
 * @returns {string} The response string.
 */
export function handler() {
	// Generate a string for the bot's uptime
	const uptime = performance.now()
	const uptimeHours = Math.floor(uptime / 1000 / 60 / 60)
	const uptimeHoursMS = uptimeHours * 1000 * 60 * 60
	const uptimeMinutes = Math.floor((uptime - uptimeHoursMS) / 1000 / 60)
	const uptimeMinutesMS = uptimeMinutes * 1000 * 60
	const uptimeSeconds = Math.floor((uptime - uptimeHoursMS - uptimeMinutesMS) / 1000)
	const uptimeArray = []

	if (uptimeHours) {
		uptimeArray.push(`${uptimeHours} hour${uptimeHours > 1 ? 's' : ''}`)
	}

	if (uptimeMinutes) {
		uptimeArray.push(`${uptimeMinutes} minute${uptimeMinutes > 1 ? 's' : ''}`)
	}

	if (uptimeSeconds) {
		uptimeArray.push(`${uptimeSeconds} second${uptimeSeconds > 1 ? 's' : ''}`)
	}

	if (uptimeArray.length > 1) {
		uptimeArray[uptimeArray.length - 1] = `and ${uptimeArray[uptimeArray.length - 1]}`
	}

	let uptimeString = uptimeArray.join(' ')

	if (uptimeArray.length > 2) {
		uptimeString = uptimeArray.join(', ')
	}

	// Generate strings for the bot's startup date and time
	const startedAtDate = new Date(Date.now() - uptime)

	const startedAtDateString = new Intl
		.DateTimeFormat('en-US', { dateStyle: 'medium' })
		.format(startedAtDate)
	const startedAtTimeString = new Intl
		.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			timeZoneName: 'short',
		})
		.format(startedAtDate)

	return {
		content: `I've been running since ${startedAtDateString} at ${startedAtTimeString}. (${uptimeString})`,
		isReply: true,
	}
}
