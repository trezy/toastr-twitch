// Module import
import fs from 'node:fs/promises'
import path from 'node:path'





export const name = 'help'

export async function handler() {
	const commandsPath = path.resolve(process.cwd(), 'src', 'commands')

	const commandFileNames = await fs.readdir(commandsPath)

	const commandFilePaths = commandFileNames.map(commandFileName => {
		return path.resolve(commandsPath, commandFileName)
	})

	const commandImportPromises = commandFilePaths.map(commandFilePath => import(commandFilePath))

	const commands = await Promise.all(commandImportPromises)

	const commandNames = commands
		.map((command, index, array) => {
			if (!command.name) {
				return null
			}

			let commandName = `!${command.name}`

			if (index === (array.length - 1)) {
				commandName = `and ${commandName}`
			}

			return commandName
		})
		.filter(Boolean)
		.join(', ')

	return `The current command available include: ${commandNames}.`
}
