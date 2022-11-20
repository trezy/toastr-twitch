export const STATE = {
	currentCard: null,
	isActive: false,
	previousCard: null,
	round: 0,

	reset() {
		this.currentCard = null
		this.isActive = false
		this.previousCard = null
		this.round = 0
	},
}
