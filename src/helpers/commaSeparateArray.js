export function commaSeparateArray(array) {
	return array
		.reduce((accumulator, item) => {
			if (item === array.at(-1)) {
				item = `and ${item}`
			}

			accumulator.push(item)

			return accumulator
		}, [])
		.join(', ')
}
