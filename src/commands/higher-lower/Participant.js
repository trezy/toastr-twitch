export class Participant {
	static collection = {}

	static clearCollection() {
		Participant
			.getAll()
			.forEach(participant => participant.delete())
	}

	static delete(id) {
		delete Participant.collection[id]
	}

	static get(id) {
		return Participant.collection[id]
	}

	static getAll() {
		return Object.values(Participant.collection)
	}

	static exists(id) {
		return Boolean(Participant.get(id))
	}

	currentGuess = null
	displayName = null
	id = null

	constructor(userInfo) {
		this.displayName = userInfo.displayName
		this.id = userInfo.userId

		Participant.collection[this.id] = this
	}

	clearGuess() {
		this.currentGuess = null
	}

	delete() {
		Participant.delete(this.id)
	}

	setGuess(guess) {
		this.currentGuess = guess
	}
}
