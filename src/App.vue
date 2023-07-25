<script setup>
import { ref, watch } from 'vue'
import twoScoresRow from './components/two-scores-row.vue'
import resultsPane from './components/results-pane.vue';

const now = new Date();
const dateS = now.toISOString().substr(0,10); 
const timeS = now.toISOString().substr(11,5);

const defaultScores = {victoryType: 'points', validScore: false, result: '', datetime: dateS + ' ' + timeS};
var scores = ref({});
setScores();

var player = ref([]);
player.value[1] = {'name': '', score: 0};
player.value[2] = {'name': '', score: 0};

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

const validKeys = [];
for (var key in form) {
	if (form[key].type === 'number') {
		if (form[key].fieldname !== 'cash') {
			validKeys.push(form[key].fieldname);
		}
	}
}

function setScores() {
	Object.assign(scores.value, defaultScores);
}

function resetForm() {
	var elemRoot = document.querySelector('#main');
	var elemMsg = document.querySelector('#reload-message');
	elemMsg.className = 'reloading';
	elemRoot.className = 'reloading';
	location.reload();
	// setScores();
}

// Hide the points fields if the user chooses
// a track victory.
function displayVictoryType(e) {
	var elem = e.target;
	if (elem.type === 'checkbox') {
		var pId = elem.dataset.player;
		var fieldName = elem.dataset.fieldname;
		var max = fieldName.length;

		var trackName = fieldName.substr(0,max-5);

		if (elem.checked) {
			scores.value.victoryType = trackName;
		} else {
			scores.value.victoryType = 'points';
		}
		
		var allCheckBoxes = document.querySelectorAll('#main table .track input');
		for (var i = 0; i < allCheckBoxes.length; i++) {
			if (allCheckBoxes[i].dataset.player !== pId || allCheckBoxes[i].dataset.fieldname !== fieldName) {
				allCheckBoxes[i].checked = false;
			}
		}
	}
}

function sumIt(e) {
	var execute = true;
	if (e !== undefined) {
		var field = e.target;
		if (field.dataset.type !== undefined && field.dataset.type === 'name') {
			execute = false;
		}
		if (field.id === 'notes') {
			execute = false;
		}
	}
	if (execute) {
		// Calculate the totals.
		for (var p=1; p<3; p++) {
			var sum = 0;
			for (var index in validKeys) {
				var value = String(player.value[p][validKeys[index]]);
				var valIsNumber = value.match(/[0-9]+/);
				if (valIsNumber) {
					sum += Number(value);
				}
				else {
					// I could force to 0, but if the user made a typo,
					// it might be more visible if the field is cleared.
					player.value[p][validKeys[index]] = '';
				}
			}
			player.value[p]['score'] = sum;
		}
	}
}
</script>

<template>
	<div id="main">
		<h1>7 Wonders Duel Score&nbsp;Card</h1>
		
		<p class="datetime">{{dateS}} - {{timeS}}</p>
		
		<table @keyup="sumIt" @click="displayVictoryType">
			<tr>
				<th>Score type</th>
				<th>Player 1</th>
				<th>Player 2</th>
			</tr>				
			<tr>
				<th>Player names </th> 
				<td><input type="text" v-model="player[1]['name']" aria-label="Name player 1" data-type="name"></td>
				<td><input type="text" v-model="player[2]['name']" aria-label="Name player 2" data-type="name"></td>
			</tr>
			<twoScoresRow v-for="fields in form" :item="fields" v-model:player="player" v-model:scores="scores"></twoScoresRow>
		</table>
		
		<resultsPane v-model:player="player" v-model:scores="scores" v-model:validKeys="validKeys" @resetform='resetForm' ></resultsPane>
	</div> <!-- /#main -->
	<div id="reload-message">Reloading...</div>
</template>

<style>
	* { font-family: sans-serif; }
	body { background: #fff; color: #000; margin: .5em; font-size: 16px; }
	#main { max-width: 100%; }
	#main.reloading { opacity: 0; transition: opacity 1s; }
	h1 { font-size: 1.6em; text-align: center; }
	.datetime { text-align: center; }
	table { display: block; margin-bottom: 1.5em; }
	tbody { display: block; }
	tr { display: block; margin-bottom: .75em; }
	tr.track { border: 4px solid #ff0;}
	td, th { display: block; margin: 0px; padding: .125em .5em; line-height: 2; }
	th { text-align: left; font-weight: bold; }
	tr:first-child th { display: none; }
	td:nth-child(2)::before { content: "player 1: "; }
	td:nth-child(3)::before { content: "player 2: "; }
	tr th:first-child { text-align: left; }
	tr:first-child th:first-child { text-align: left; }
	#reload-message { display: none; position: absolute; top: 0em; left: 0em; max-width: 32em; padding: 5em; background: #fff; font-weight: bold; }
	#reload-message.reloading { display: block; }

	@media (min-width: 321px) {
		table { max-width: 360px; }
	}
	@media (min-width: 533px) {
		#main { max-width: 32em; }
		table { border-collapse: collapse; max-width: none; display: table; }
		table { box-shadow: .5em .5em .5em rgba(0,0,0,.3333); margin-left: 1.2em;  }
		tbody { display: table-row-group; }
		tr { display: table-row; margin: 0em; }
		td, th { display: table-cell; width: 5em;  border: 1px solid #666; vertical-align: top; }
		th { font-weight: normal; text-align: center; }
		th:first-child { width: 18em; }
		tr th:first-child { float: none; width: 18em; }
		tr:first-child th { display: table-cell; }
		tr:first-child th:first-child { float: none; width: 18em; }
		tr th:first-child { text-align: left; }
		tr:first-child th:first-child { text-align: center; }
		td:nth-child(2)::before { content: ""; }
		td:nth-child(3)::before { content: ""; }
	}
</style>