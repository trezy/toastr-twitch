// Local imports
import * as botUptime from './bot-uptime.js'
import * as currency from './currency.js'
import * as discord from './discord.js'
import * as eightBall from './8ball.js'
import * as fortune from './fortune.js'
import * as help from './help.js'
import * as instagram from './instagram.js'
import * as mastodon from './mastodon.js'
import * as ping from './ping.js'
import * as tiktok from './tiktok.js'
import * as twitter from './twitter.js'
import * as youtube from './youtube.js'





export const commands = [
	botUptime,
	currency,
	discord,
	eightBall,
	fortune,
	help,
	instagram,
	mastodon,
	ping,
	tiktok,
	twitter,
	youtube,
].reduce((accumulator, commandData) => {
	accumulator[commandData.name.toLowerCase()] = commandData.handler

	if (commandData.aliases) {
		commandData.aliases.forEach(alias => {
			accumulator[alias.toLowerCase()] = commandData.handler
		})
	}
	return accumulator
}, {})
