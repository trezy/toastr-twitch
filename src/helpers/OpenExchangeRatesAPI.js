// Module imports
import fetch from 'node-fetch'





/******************************************************************************\
 * Core functions
\******************************************************************************/

function apiFetch(path, options = {}) {
	const { query } = options

	const compiledURL = new URL(path.replace(/^\/+/, ''), 'https://openexchangerates.org/api/')

	compiledURL.searchParams.set('app_id', process.env.OPEN_EXCHANGE_RATES_APP_ID)
	compiledURL.searchParams.set('prettyprint', 'false')

	if (query) {
		Object
			.entries(query)
			.forEach(([key, value]) => {
				compiledURL.searchParams.set(key, value)
			})
	}

	return fetch(compiledURL, options)
}

function apiFetchJSON(...args) {
	return apiFetch(...args)
		.then(response => response.json())
}





/******************************************************************************\
 * Helpers
\******************************************************************************/

export function convert(options) {
	const {
		destinationExchangeRate,
		sourceExchangeRate,
		value,
	} = options

	return apiFetchJSON(`/convert/${value}/${sourceExchangeRate}/${destinationExchangeRate}`)
}

export function getCurrencies() {
	return apiFetchJSON('/currencies.json', {
		query: {
			show_alternative: true,
		},
	})
}

export function getExchangeRates() {
	return apiFetchJSON('/latest.json', {
		query: {
			show_alternative: true,
		},
	})
}
