// Module imports
import { CronJob } from 'cron'
import EventEmitter from 'node:events'
import fs from 'node:fs/promises'
import path from 'node:path'





// Local imports
import { commands } from '../commands/index.js'
import * as db from '../helpers/db.js'
import * as Twitch from './Twitch.js'





// Constants
const { TWITCH_CHANNEL } = process.env





class BotClass extends EventEmitter {
	jobs = []
	messageCounter = 0

	constructor() {
		super()
	}

	async handleCommandResult(options) {
		const {
			result,
			messageObject,
		} = options

		if (!result) {
			return
		}

		if (typeof result === 'string') {
			return this.say({ result })
		}

		const responseOptions = {}

		if (result.isReply) {
			responseOptions.replyTo = messageObject
		}

		return this.say(options)
	}

	async handleMessage(...args) {
		const [
			/* channel */,
			/* username */,
			/* message */,
			messageObject,
		] = args

		this.messageCounter += 1

		await db.addPoints(messageObject.userInfo.userId, 5)

		const [
			commandName,
			...commandArgs
		] = messageObject.content.value
			.replace(/^!/, '')
			.replace(/\s+/, ' ')
			.split(' ')

		if (messageObject.content.value.startsWith('!')) {
			const command = commands[commandName.toLowerCase()]

			if (command) {
				const result = await command({
					commandArgs,
					messageObject,
				})

				this.handleCommandResult({
					result,
					messageObject,
				})
			}
		}

		this.emit('message', {
			commandArgs: [
				commandName,
				...commandArgs
			],
			messageObject,
		})
	}

	async initialiseCron() {
		const cronPath = path.resolve(process.cwd(), 'src', 'cron')

		const cronTaskFilenames = await fs.readdir(cronPath)

		const cronTasks = await Promise.all(cronTaskFilenames.map(filename => {
			const filePath = path.resolve(cronPath, filename)

			return import(filePath)
		}))

		cronTasks.forEach(({ default: cronTask }) => {
			this.jobs.push(new CronJob(
				cronTask.runAt,
				cronTask.handler,
				cronTask.onCompleteHandler,
				true,
				null,
				this,
			))
		})
	}

	say(options) {
		const {
			result,
			messageObject,
		} = options

		const responseOptions = {}

		if (result.isReply) {
			responseOptions.replyTo = messageObject
		}

		return Twitch.chatClient.say(TWITCH_CHANNEL, result.content, responseOptions)
	}

	async start() {
		Twitch.chatClient.onMessage((...args) => this.handleMessage(...args))

		await Twitch.chatClient.connect()

		await Twitch.chatClient.onRegister(async() => {
			await Twitch.chatClient.join(TWITCH_CHANNEL)
			this.initialiseCron()
		})
	}
}

export const Bot = new BotClass
