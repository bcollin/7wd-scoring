const form = [
	{
		fieldname: 'sciencetrack',
		categories: ['science', 'track', 'slimfield'],
		label: "Was this a <em>science victory</em>?",
		info: "(You win the science track if your science cards contain 6 or more different symbols.)",
		type: "checkbox"
	},
	{
		fieldname: 'militarytrack',
		categories: ['military', 'track', 'slimfield'],
		label: "Was this a <em>military victory</em>?",
		info: "(You win the military track if you have moved the pawn more than 10 positions past the center line towards the enemy.)",
		type: "checkbox"
	},
	{
		fieldname: 'culturepoints',
		categories: ['card', 'culture', 'slimfield'],
		label: "How many <em>culture</em> points?",
		info: "(Count the green points on your blue cards.)",
		type: "number"
	},
	{
		fieldname: 'sciencepoints',
		categories: ['card', 'science', 'slimfield'],
		label: "How many <em>science</em> points?",
		info: "(Count the green points on your green cards.)",
		type: "number"
	},
	{
		fieldname: 'commercepoints',
		categories: ['card', 'commerce', 'slimfield'],
		label: "How many <em>commerce</em> points?",
		info: "(Count the green points on your yellow cards.)",
		type: "number"
	},
	{
		fieldname: 'guildpoints',
		categories: ['card', 'guild', 'slimfield'],
		label: "How many <em>guild</em> points?",
		info: "(Count the green points on your purple cards.)",
		type: "number"
	},
	{
		fieldname: 'wonderpoints',
		categories: ['wonder', 'slimfield'],
		label: "How many <em>Wonder</em> points?",
		info: "(Count the green points on the cards of the Wonders you built.)",
		type: "number"
	},
	{
		fieldname: 'sciencecoinpoints',
		categories: ['coin', 'science', 'slimfield'],
		label: "How many <em>science coin</em> points?",
		info: "(Count the green points on the green coins.)",
		type: "number"
	},
	{
		fieldname: 'cash',
		categories: ['cash', 'slimfield'],
		label: "<em>How much money</em> do you have left?",
		info: "(Count de Monet, pardon, count your money.)",
		type: "number"
	},
	{
		fieldname: 'cashpoints',
		categories: ['coin', 'money', 'slimfield'],
		label: "How many <em>money points</em>?",
		info: "(Count your money, divide by three; round down to the nearest integer. Or fill out the money you have in the row above and the app will calculate the points for you.)",
		type: "number"
	},
	{
		fieldname: 'militarypoints',
		categories: ['board', 'military', 'slimfield'],
		label: "How many <em>military points</em>?",
		info: "(Look at the pawn; is it in your opponent's territory? Then you get the green points shown below your pawn.)",
		type: "number"
	},
	{
		fieldname: 'total',
		categories: [],
		label: "Total",
		info: "",
		type: "markup",
		title: "for player"
	},
	{
		fieldname: 'notes',
		categories: [''],
		label: "Optional notes",
		info: "",
		type: "notes"
	}
];

export default {
	defaultForm: form
}