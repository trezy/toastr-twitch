export const STATE = {
	currentCard: null,
	isActive: false,
	round: 0,

	reset() {
		this.currentCard = null
		this.isActive = false
		this.round = 0
	},
}
