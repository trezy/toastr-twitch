// Module imports
import mri from 'mri'





// Local imports
import * as OpenExchangeRatesAPI from '../helpers/OpenExchangeRatesAPI.js'





// Constants
const CURRENCIES = {}
const EXCHANGE_RATES = {}





export const name = 'currency'

/**
 * Converts a value from one type to another.
 *
 * @returns {object} The response object.
 */
export async function handler(options) {
	const { commandArgs } = options

	// Get a list of supported currencies from the Open Exchange Rates API if we haven't already
	if (!Object.keys(CURRENCIES).length) {
		const result = await OpenExchangeRatesAPI.getCurrencies()
		Object.assign(CURRENCIES, result)
	}

	if (!Object.keys(EXCHANGE_RATES).length) {
		const result = await OpenExchangeRatesAPI.getExchangeRates()
		Object.assign(EXCHANGE_RATES, result.rates)
	}

	const response = {
		content: null,
		isReply: true,
	}

	let {
		_: [value],
		from: sourceExchangeRate,
		to: destinationExchangeRate,
	} = mri(commandArgs, {
		alias: {
			from: ['f'],
			to: ['t'],
		},
		default: {
			from: 'USD',
		},
	})

	// Set the value to 1 if
	if (!value) {
		value = 1
	}

	// Exit if the requested value isn't a valid number
	if (Number.isNaN(Number(value))) {
		response.content = `${value} is not a valid number.`
		return response
	}

	// Convert the value to a float
	value = parseFloat(value)

	if (!destinationExchangeRate) {
		response.content = `The \`--to\` flag is required.`
		return response
	}

	// Force correct casing for exchange rate codes
	destinationExchangeRate = destinationExchangeRate.toUpperCase()
	sourceExchangeRate = sourceExchangeRate.toUpperCase()

	if (!CURRENCIES[sourceExchangeRate]) {
		response.content = `Sorry, ${sourceExchangeRate} isn't supported.`
		return response
	}

	if (!CURRENCIES[destinationExchangeRate]) {
		response.content = `Sorry, ${destinationExchangeRate} isn't supported.`
		return response
	}

	let destinationValue = (value * EXCHANGE_RATES[sourceExchangeRate]) * EXCHANGE_RATES[destinationExchangeRate]

	let formattedDestinationValue = `${destinationValue} ${destinationExchangeRate}`
	let formattedSourceValue = `${value} ${sourceExchangeRate}`

	try {
		formattedDestinationValue = Intl
			.NumberFormat('en-US', {
				currency: destinationExchangeRate,
				style: 'currency',
			})
			.format((value * EXCHANGE_RATES[sourceExchangeRate]) * EXCHANGE_RATES[destinationExchangeRate])
	} catch (error) {}

	try {
		formattedSourceValue = Intl
			.NumberFormat('en-US', {
				currency: sourceExchangeRate,
				style: 'currency',
			})
			.format(value)
	} catch (error) {}

	response.content = `${formattedSourceValue} (${CURRENCIES[sourceExchangeRate]}) is equivalent to ${formattedDestinationValue} (${CURRENCIES[destinationExchangeRate]})`
	return response
}
